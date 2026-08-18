import { SubmitReviewCommand } from '../commands/PublicationCommands';
import { IPublicationRepository } from '../ports/IPublicationRepository';
import { IPublicationEventPublisher } from '../ports/IPublicationEventPublisher';
import { SubmissionId } from '../../domain/value-objects/PublicationValueObjects';
import { Review } from '../../domain/entities/Review';
import { ReviewDecision } from '../../domain/types/PublicationEnums';
import { ReviewCompletedEvent } from '../../domain/events/PublicationEvents';

export class SubmitReviewUseCase {
  constructor(
    private readonly repository: IPublicationRepository,
    private readonly eventPublisher: IPublicationEventPublisher
  ) {}

  async execute(command: SubmitReviewCommand): Promise<void> {
    const submission = await this.repository.findSubmissionById(new SubmissionId(command.submissionId));
    if (!submission) throw new Error('Submission not found.');

    // Find assignment for this reviewer in current round
    const assignment = submission.allAssignments.find(a => 
      a.reviewer.getValue() === command.reviewerId && 
      a.currentRound === submission.currentRound
    );

    if (!assignment) {
      throw new Error('No active assignment found for this reviewer in the current round.');
    }

    // Usually reviewer must accept invitation first, we auto-accept here for brevity if pending
    if (assignment.currentStatus === 'PENDING') {
      assignment.acceptInvitation();
    }

    // Create Review
    const review = new Review(
      command.decision as ReviewDecision,
      command.commentsToAuthor,
      command.commentsToEditor
    );

    // Submit
    assignment.submitReview(review);

    // Persist & Publish
    await this.repository.saveSubmission(submission);

    await this.eventPublisher.publish(
      new ReviewCompletedEvent(
        submission.id.getValue(),
        assignment.id.getValue(),
        command.decision
      )
    );
  }
}
