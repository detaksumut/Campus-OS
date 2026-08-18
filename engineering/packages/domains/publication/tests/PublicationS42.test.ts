import { describe, it, expect } from 'vitest';
import { EventBus } from '@campus-os/kernel';
import { SubmissionPolicy } from '../src/policies/SubmissionPolicy';
import { ConflictOfInterestPolicy } from '../src/policies/ConflictOfInterestPolicy';
import { InvitationRuntime } from '../src/runtime/InvitationRuntime';
import { AssignmentRuntime } from '../src/runtime/AssignmentRuntime';
import { ArticleRuntime } from '../src/runtime/ArticleRuntime';
import { SubmissionRuntime } from '../src/runtime/SubmissionRuntime';
import { EditorialPolicy, SubmissionDto } from '../src/contracts';

const defaultEditorialPolicy: EditorialPolicy = {
  minimumAcceptedReviewers: 2,
  invitationExpiryMs: 604800000, // 7 days
  reviewDeadlineMs: 2592000000,  // 30 days
  maxActiveAssignmentsPerReviewer: 3
};

describe('Publication - Sprint 4.2', () => {
  it('should orchestrate full candidate → invitation → assignment flow', async () => {
    const bus = new EventBus();
    const editorialPolicy = defaultEditorialPolicy;
    const submissionPolicy = new SubmissionPolicy(editorialPolicy);
    const article = new ArticleRuntime();
    const submission = new SubmissionRuntime(article, submissionPolicy);
    const invitation = new InvitationRuntime(bus);
    const assignment = new AssignmentRuntime(bus);

    // Create Submission
    const artId = await article.createArticle(
      { title: 'T', abstract: 'Long enough abstract text here to pass the 50 char threshold yes', keywords: ['AI', 'ML', 'CS'], language: 'en' },
      { articleType: 'Research Article', researchField: 'Computer Science', discipline: 'CS' },
      { mainFile: 'paper.pdf', figures: [], tables: [], supplementary: [] }
    );
    const subId = await submission.createDraft(artId, 'author_1', {
      fullName: 'Dr. First', email: 'first@uni.edu', institution: 'MIT', order: 1, role: 'CORRESPONDING'
    });
    await submission.submit(subId);

    // Send invitations to two reviewers
    const inv1 = await invitation.sendInvitation(subId, 'reviewer_a', editorialPolicy.invitationExpiryMs);
    const inv2 = await invitation.sendInvitation(subId, 'reviewer_b', editorialPolicy.invitationExpiryMs);

    await invitation.accept(inv1);
    await invitation.accept(inv2);

    // Create assignments
    const asgn1 = await assignment.createAssignment(subId, 'reviewer_a', inv1);
    const asgn2 = await assignment.createAssignment(subId, 'reviewer_b', inv2);
    expect(asgn1).toBeDefined();
    expect(asgn2).toBeDefined();

    // Verify assignment list
    const assignments = await assignment.getBySubmission(subId);
    expect(assignments.length).toBe(2);
    expect(assignments[0].state).toBe('Assigned');
  });

  it('should detect conflicts via ConflictOfInterestPolicy', () => {
    const coiPolicy = new ConflictOfInterestPolicy();
    const fakeSubmission: SubmissionDto = {
      submissionId: 'sub_1',
      articleId: 'art_1',
      state: 'Reviewer Assignment',
      authors: [
        { referenceId: 'ref_1', authorId: 'rev_conflict', fullName: 'Dr. Conflict', email: 'c@mit.edu', institution: 'MIT', order: 1, role: 'CORRESPONDING', status: 'LINKED' }
      ],
      acceptedReviewerCount: 0
    };

    // COI-02: reviewer is a co-author
    const conflicts = coiPolicy.getConflicts('rev_conflict', 'Harvard', fakeSubmission, []);
    expect(conflicts.length).toBeGreaterThan(0);
    expect(conflicts[0]).toContain('COI-02');
  });

  it('should block invitation double-response', async () => {
    const bus = new EventBus();
    const invitation = new InvitationRuntime(bus);
    const inv = await invitation.sendInvitation('sub_x', 'rev_x', 1000);
    await invitation.decline(inv);
    await expect(invitation.accept(inv)).rejects.toThrow(/already/);
  });

  it('should validate editorial policy minimum reviewer requirement', () => {
    const policy = new SubmissionPolicy(defaultEditorialPolicy);
    const fakeSubmission: SubmissionDto = {
      submissionId: 'sub_1', articleId: 'art_1',
      state: 'Reviewer Assignment', authors: [], acceptedReviewerCount: 1
    };
    expect(policy.canTransitionToUnderReview(fakeSubmission)).toBe(false);
    fakeSubmission.acceptedReviewerCount = 2;
    expect(policy.canTransitionToUnderReview(fakeSubmission)).toBe(true);
  });
});
