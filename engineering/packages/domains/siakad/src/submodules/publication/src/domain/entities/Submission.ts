import { SubmissionId, AuthorId, ReviewerId, ReviewAssignmentId, EditorId } from '../value-objects/PublicationValueObjects';
import { SubmissionStatus, ReviewRoundStatus, ReviewDecision } from '../types/PublicationEnums';
import { Manuscript } from './Manuscript';
import { ReviewAssignment } from './ReviewAssignment';
import { EditorialDecision } from './EditorialDecision';

export class Submission {
  private manuscripts: Manuscript[] = [];
  private assignments: ReviewAssignment[] = [];
  private editorialDecisions: EditorialDecision[] = [];

  constructor(
    private readonly submissionId: SubmissionId,
    private readonly authorId: AuthorId,
    private status: SubmissionStatus = SubmissionStatus.DRAFT,
    private currentReviewRound: number = 0
  ) {}

  get id(): SubmissionId { return this.submissionId; }
  get author(): AuthorId { return this.authorId; }
  get currentStatus(): SubmissionStatus { return this.status; }
  get currentRound(): number { return this.currentReviewRound; }

  get latestManuscript(): Manuscript | undefined {
    return this.manuscripts.length > 0 ? this.manuscripts[this.manuscripts.length - 1] : undefined;
  }
  
  get allAssignments(): ReviewAssignment[] { return this.assignments; }
  get allDecisions(): EditorialDecision[] { return this.editorialDecisions; }

  submitInitialManuscript(manuscript: Manuscript): void {
    if (this.status !== SubmissionStatus.DRAFT) throw new Error('Can only submit from DRAFT status.');
    this.manuscripts.push(manuscript);
    this.status = SubmissionStatus.SUBMITTED;
  }

  startScreening(): void {
    if (this.status !== SubmissionStatus.SUBMITTED) throw new Error('Submission must be SUBMITTED to start screening.');
    this.status = SubmissionStatus.SCREENING;
  }

  assignReviewer(assignmentId: ReviewAssignmentId, reviewerId: ReviewerId, deadline: Date): void {
    if (this.status === SubmissionStatus.SCREENING || this.status === SubmissionStatus.MAJOR_REVISION) {
      this.status = SubmissionStatus.UNDER_REVIEW;
      if (this.currentReviewRound === 0 || this.status === SubmissionStatus.MAJOR_REVISION) {
        this.currentReviewRound += 1;
      }
    }
    if (this.status !== SubmissionStatus.UNDER_REVIEW) {
      throw new Error('Can only assign reviewers when UNDER_REVIEW.');
    }
    
    // Check if reviewer is already assigned in this round
    const existing = this.assignments.find(a => a.reviewer.getValue() === reviewerId.getValue() && a.currentRound === this.currentReviewRound);
    if (existing) throw new Error('Reviewer already assigned in this round.');

    this.assignments.push(new ReviewAssignment(assignmentId, reviewerId, this.currentReviewRound, deadline));
  }

  makeEditorialDecision(editorId: EditorId, decision: ReviewDecision, justification: string): void {
    if (this.status !== SubmissionStatus.UNDER_REVIEW) {
      throw new Error('Can only make decisions after review.');
    }

    const edDecision = new EditorialDecision(editorId, decision, justification);
    this.editorialDecisions.push(edDecision);

    switch (decision) {
      case ReviewDecision.ACCEPT:
        this.status = SubmissionStatus.ACCEPTED;
        break;
      case ReviewDecision.MINOR_REVISION:
        this.status = SubmissionStatus.MINOR_REVISION;
        break;
      case ReviewDecision.MAJOR_REVISION:
        this.status = SubmissionStatus.MAJOR_REVISION;
        break;
      case ReviewDecision.REJECT:
        this.status = SubmissionStatus.REJECT;
        break;
    }
  }

  submitRevision(manuscript: Manuscript): void {
    if (this.status !== SubmissionStatus.MINOR_REVISION && this.status !== SubmissionStatus.MAJOR_REVISION) {
      throw new Error('Can only submit revisions when requested.');
    }
    this.manuscripts.push(manuscript);
    this.status = SubmissionStatus.SUBMITTED; // Starts the cycle over slightly
  }
}
