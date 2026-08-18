import { ReviewAssignmentId, ReviewerId } from '../value-objects/PublicationValueObjects';
import { ReviewRoundStatus } from '../types/PublicationEnums';
import { Review } from './Review';

export class ReviewAssignment {
  private review?: Review;

  constructor(
    private readonly assignmentId: ReviewAssignmentId,
    private readonly reviewerId: ReviewerId,
    private readonly round: number,
    private readonly deadline: Date,
    private status: ReviewRoundStatus = ReviewRoundStatus.PENDING
  ) {}

  get id(): ReviewAssignmentId { return this.assignmentId; }
  get reviewer(): ReviewerId { return this.reviewerId; }
  get currentRound(): number { return this.round; }
  get currentStatus(): ReviewRoundStatus { return this.status; }
  get submittedReview(): Review | undefined { return this.review; }

  acceptInvitation(): void {
    if (this.status !== ReviewRoundStatus.PENDING) throw new Error('Cannot accept a non-pending invitation.');
    this.status = ReviewRoundStatus.ACCEPTED_INVITATION;
  }

  submitReview(review: Review): void {
    if (this.status !== ReviewRoundStatus.ACCEPTED_INVITATION) {
      throw new Error('Reviewer must accept invitation before submitting.');
    }
    this.review = review;
    this.status = ReviewRoundStatus.COMPLETED;
  }
}
