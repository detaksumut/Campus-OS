import { IReviewRuntime, ReviewDto, ReviewForm, ReviewLifecycle } from '../contracts';
import { IEventBus } from '@campus-os/kernel';

export class ReviewRuntime implements IReviewRuntime {
  private reviews = new Map<string, ReviewDto>();

  private transitions: Record<ReviewLifecycle, ReviewLifecycle[]> = {
    'Draft':      ['Submitted'],
    'Submitted':  ['Validated'],
    'Validated':  ['Locked'],
    'Locked':     []
  };

  constructor(private eventBus: IEventBus) {}

  async openReview(assignmentId: string, submissionId: string, reviewerId: string, roundNumber: number): Promise<string> {
    const reviewId = `rev_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    this.reviews.set(reviewId, {
      reviewId, assignmentId, submissionId, reviewerId, roundNumber,
      state: 'Draft', createdAt: Date.now()
    });
    return reviewId;
  }

  async saveDraft(reviewId: string, form: Partial<ReviewForm>): Promise<void> {
    const r = this.reviews.get(reviewId);
    if (!r) throw new Error('Review not found');
    if (r.state !== 'Draft') throw new Error('Review can only be edited in Draft state');
    r.form = { ...(r.form as ReviewForm || {}), ...form } as ReviewForm;
  }

  private getOrThrow(reviewId: string): ReviewDto {
    const r = this.reviews.get(reviewId);
    if (!r) throw new Error('Review not found');
    return r;
  }

  private doTransition(review: ReviewDto, target: ReviewLifecycle): void {
    if (!this.transitions[review.state].includes(target)) {
      throw new Error(`Invalid review transition: '${review.state}' → '${target}'`);
    }
    review.state = target;
  }

  async submit(reviewId: string): Promise<void> {
    const r = this.getOrThrow(reviewId);
    if (!r.form?.recommendation) throw new Error('Review must have a Recommendation before submission');
    if (!r.form.commentsToAuthor) throw new Error('Comments to Author are required');
    this.doTransition(r, 'Submitted');
    r.submittedAt = Date.now();
  }

  async validate(reviewId: string): Promise<void> {
    const r = this.getOrThrow(reviewId);
    this.doTransition(r, 'Validated');
    r.validatedAt = Date.now();
  }

  async lock(reviewId: string): Promise<void> {
    const r = this.getOrThrow(reviewId);
    this.doTransition(r, 'Locked');
    r.lockedAt = Date.now();
  }

  async getReview(reviewId: string): Promise<ReviewDto | null> {
    return this.reviews.get(reviewId) || null;
  }

  async getByAssignment(assignmentId: string): Promise<ReviewDto | null> {
    return Array.from(this.reviews.values()).find(r => r.assignmentId === assignmentId) || null;
  }
}
