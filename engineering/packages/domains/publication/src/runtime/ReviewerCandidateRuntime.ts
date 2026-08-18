import { IReviewerCandidateRuntime, ReviewerCandidateDto, EditorialPolicy } from '../contracts';
import { IdentityContext } from '@campus-os/identity/src/contracts';
import { ConflictOfInterestPolicy } from '../policies/ConflictOfInterestPolicy';
import { ISubmissionRuntime, IAssignmentRuntime } from '../contracts';

export class ReviewerCandidateRuntime implements IReviewerCandidateRuntime {
  constructor(
    private directoryQuery: IDirectoryQuery,
    private submissionRuntime: ISubmissionRuntime,
    private assignmentRuntime: IAssignmentRuntime,
    private coiPolicy: ConflictOfInterestPolicy,
    private editorialPolicy: EditorialPolicy
  ) {}

  async findCandidates(submissionId: string, keywords: string[], researchField: string): Promise<ReviewerCandidateDto[]> {
    const submission = await this.submissionRuntime.getSubmission(submissionId);
    if (!submission) throw new Error('Submission not found');

    const existingAssignments = await this.assignmentRuntime.getBySubmission(submissionId);

    // Query verified reviewers with matching research areas via the Membership CQRS Projection
    const reviewers = await this.directoryQuery.searchReviewerDirectory({
      researchArea: researchField,
      isVerified: true
    });

    const candidates: ReviewerCandidateDto[] = [];

    for (const reviewer of reviewers) {
      const conflicts = this.coiPolicy.getConflicts(
        reviewer.membershipId,
        reviewer.institution,
        submission,
        existingAssignments
      );

      const matchedAreas = reviewer.researchAreas.filter(a => a === researchField);
      const matchedKeywords = reviewer.researchAreas.filter(k => keywords.includes(k));

      // Scoring Engine (configurable weights)
      const researchMatch = matchedAreas.length > 0 ? 40 : 0;
      const expertiseMatch = matchedKeywords.length > 0 ? Math.min(25, matchedKeywords.length * 8) : 0;
      const tierScore = reviewer.tier === 'Scholar' ? 15 : reviewer.tier === 'Premium' ? 10 : 5;
      const workloadScore = 10; // Placeholder – will use activeAssignmentCount when available
      const score = researchMatch + expertiseMatch + tierScore + workloadScore;

      candidates.push({
        reviewerId: reviewer.membershipId,
        membershipId: reviewer.membershipId,
        displayName: reviewer.displayName,
        institution: reviewer.institution,
        researchAreas: reviewer.researchAreas,
        score,
        scoreBreakdown: { researchMatch, expertiseMatch, tier: tierScore, workload: workloadScore },
        matchedResearchAreas: matchedAreas,
        matchedKeywords,
        conflicts,
        availability: 'Available' // Placeholder; sourced from AuthorRuntime in future
      });
    }

    // Sort by score descending; candidates with conflicts go last
    return candidates.sort((a, b) => {
      if (a.conflicts.length > 0 && b.conflicts.length === 0) return 1;
      if (a.conflicts.length === 0 && b.conflicts.length > 0) return -1;
      return b.score - a.score;
    });
  }
}
