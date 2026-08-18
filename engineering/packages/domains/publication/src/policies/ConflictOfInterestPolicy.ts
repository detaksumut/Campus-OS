import { SubmissionDto, AssignmentDto } from '../contracts';

export interface ConflictRule {
  id: string;
  description: string;
  check(reviewerId: string, reviewerInstitution: string, submission: SubmissionDto, existingAssignments: AssignmentDto[]): boolean;
}

export class ConflictOfInterestPolicy {
  private rules: ConflictRule[] = [
    {
      id: 'COI-01',
      description: 'Reviewer is from the same institution as the Corresponding Author.',
      check: (_, reviewerInstitution, submission) => {
        const corresponding = submission.authors.find(a => a.role === 'CORRESPONDING');
        return !!corresponding && corresponding.institution === reviewerInstitution;
      }
    },
    {
      id: 'COI-02',
      description: 'Reviewer is listed as an Author or Co-Author on this Submission.',
      check: (reviewerId, _, submission) => {
        return submission.authors.some(a => a.authorId === reviewerId);
      }
    },
    {
      id: 'COI-03',
      description: 'Reviewer already has an active assignment on this Submission.',
      check: (reviewerId, _, submission, assignments) => {
        return assignments.some(a =>
          a.reviewerId === reviewerId &&
          a.submissionId === submission.submissionId &&
          a.state !== 'Cancelled'
        );
      }
    }
    // Future rules (COI-04: lab affiliation, COI-05: collaboration within N years) can be added here
  ];

  getConflicts(
    reviewerId: string,
    reviewerInstitution: string,
    submission: SubmissionDto,
    existingAssignments: AssignmentDto[]
  ): string[] {
    return this.rules
      .filter(rule => rule.check(reviewerId, reviewerInstitution, submission, existingAssignments))
      .map(rule => `${rule.id}: ${rule.description}`);
  }

  hasConflict(
    reviewerId: string,
    reviewerInstitution: string,
    submission: SubmissionDto,
    existingAssignments: AssignmentDto[]
  ): boolean {
    return this.getConflicts(reviewerId, reviewerInstitution, submission, existingAssignments).length > 0;
  }
}
