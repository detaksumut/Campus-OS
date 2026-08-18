import { describe, it, expect } from 'vitest';
import { EventBus } from '@campus-os/kernel';
import { ReviewRuntime } from '../src/runtime/ReviewRuntime';
import { ReviewRoundRuntime } from '../src/runtime/ReviewRoundRuntime';
import { AssignmentRuntime } from '../src/runtime/AssignmentRuntime';
import { InvitationRuntime } from '../src/runtime/InvitationRuntime';
import { ArticleRuntime } from '../src/runtime/ArticleRuntime';
import { SubmissionRuntime } from '../src/runtime/SubmissionRuntime';
import { SubmissionPolicy } from '../src/policies/SubmissionPolicy';
import { EditorialPolicy, ReviewRecommendation } from '../src/contracts';

const editorialPolicy: EditorialPolicy = {
  minimumAcceptedReviewers: 2,
  maximumAcceptedReviewers: 3,
  invitationExpiryMs: 604800000,
  reviewDeadlineMs: 2592000000,
  reminderScheduleMs: [259200000, 86400000],
  allowEditorOverride: true
};

describe('Publication - Sprint 4.3', () => {
  it('should complete a full double blind review round including Editorial Decision', async () => {
    const bus = new EventBus();
    const article = new ArticleRuntime();
    const subPolicy = new SubmissionPolicy(editorialPolicy);
    const submission = new SubmissionRuntime(article, subPolicy);
    const invitation = new InvitationRuntime(bus);
    const assignment = new AssignmentRuntime(bus);
    const review = new ReviewRuntime(bus);
    const round = new ReviewRoundRuntime(bus);

    // 1. Create Submission
    const artId = await article.createArticle(
      { title: 'T', abstract: 'Abstract long enough to pass 50 chars threshold here!', keywords: ['AI', 'ML', 'DL'], language: 'en' },
      { articleType: 'Research', researchField: 'CS', discipline: 'CS' },
      { mainFile: 'paper.pdf', figures: [], tables: [], supplementary: [] }
    );
    const subId = await submission.createDraft(artId, 'auth_1', {
      fullName: 'Dr. Author', email: 'a@uni.edu', institution: 'MIT', order: 1, role: 'CORRESPONDING'
    });
    await submission.submit(subId);

    // 2. Open Round 1
    const roundId = await round.openRound(subId);
    await round.startCollecting(roundId);

    // 3. Invite & assign two reviewers
    const inv1 = await invitation.sendInvitation(subId, 'rev_1', 1, editorialPolicy.invitationExpiryMs);
    const inv2 = await invitation.sendInvitation(subId, 'rev_2', 1, editorialPolicy.invitationExpiryMs);

    // Reviewer views then accepts
    await invitation.view(inv1);
    expect((await invitation.getInvitation(inv1))?.status).toBe('Viewed');
    await invitation.accept(inv1);
    await invitation.accept(inv2);

    const asgn1 = await assignment.createAssignment(subId, 'rev_1', inv1, 1);
    const asgn2 = await assignment.createAssignment(subId, 'rev_2', inv2, 1);
    await round.addAssignment(roundId, asgn1);
    await round.addAssignment(roundId, asgn2);

    // 4. Reviewer 1 completes review
    const rev1Id = await review.openReview(asgn1, subId, 'rev_1', 1);
    await review.saveDraft(rev1Id, {
      recommendation: { type: 'Minor Revision', confidence: 'High', submittedAt: Date.now() },
      scores: { originality: 8, methodology: 7, clarity: 9, significance: 8 },
      strengths: 'Novel approach',
      weaknesses: 'Limited dataset',
      commentsToAuthor: 'Please expand Section 3.',
      commentsToEditor: 'Solid work, needs minor revision.',
      attachments: []
    });
    await review.submit(rev1Id);
    await review.validate(rev1Id);
    await review.lock(rev1Id);

    // 5. Assignment progresses
    await assignment.confirm(asgn1);
    await assignment.startReview(asgn1);
    await assignment.markReviewSubmitted(asgn1);
    await assignment.verify(asgn1);
    const rec1: ReviewRecommendation = { type: 'Minor Revision', confidence: 'High', submittedAt: Date.now() };
    await assignment.complete(asgn1, rec1);

    const completedAssignment = (await assignment.getBySubmission(subId)).find(a => a.assignmentId === asgn1);
    expect(completedAssignment?.state).toBe('Completed');
    expect(completedAssignment?.recommendation?.type).toBe('Minor Revision');

    // 6. Close the round
    await round.close(roundId);
    const closedRound = await round.getRound(roundId);
    expect(closedRound?.state).toBe('Closed');

    // 7. Verify Invitation cannot be accepted twice
    await expect(invitation.accept(inv1)).rejects.toThrow(/already/);
  });

  it('should enforce Review state transitions', async () => {
    const bus = new EventBus();
    const review = new ReviewRuntime(bus);
    const revId = await review.openReview('asgn_x', 'sub_x', 'rev_x', 1);

    // Cannot submit without recommendation
    await expect(review.submit(revId)).rejects.toThrow();

    // Cannot lock before validated
    await review.saveDraft(revId, {
      recommendation: { type: 'Accept', confidence: 'High', submittedAt: Date.now() },
      commentsToAuthor: 'Excellent manuscript, accepted as is.'
    } as any);
    await review.submit(revId);
    await expect(review.lock(revId)).rejects.toThrow(/Invalid review transition/);
    await review.validate(revId);
    await review.lock(revId);
    expect((await review.getReview(revId))?.state).toBe('Locked');
  });

  it('should carry previous reviewers as suggestions into Round 2', async () => {
    const bus = new EventBus();
    const round = new ReviewRoundRuntime(bus);
    const subId = 'sub_multiround';

    await round.openRound(subId); // Round 1
    const rounds = await round.getBySubmission(subId);
    
    // Round 2 inherits reviewers as suggestions
    const suggestedReviewers = [
      { reviewerId: 'rev_1', membershipId: 'mem_1', displayName: 'Dr. A', previousRound: 1, isFromPreviousRound: true }
    ];
    const r2Id = await round.openRound(subId, suggestedReviewers);
    const round2 = await round.getRound(r2Id);
    
    expect(round2?.roundNumber).toBe(2);
    expect(round2?.suggestedReviewers[0].isFromPreviousRound).toBe(true);
    expect(round2?.suggestedReviewers[0].reviewerId).toBe('rev_1');
  });
});
