import { AssignReviewerCommand } from '../commands/PublicationCommands';
import { IPublicationRepository } from '../ports/IPublicationRepository';
import { IMembershipValidationService } from '../ports/IMembershipValidationService';
import { IPublicationEventPublisher } from '../ports/IPublicationEventPublisher';
import { SubmissionId, ReviewerId, ReviewAssignmentId } from '../../domain/value-objects/PublicationValueObjects';
import { ReviewerAssignedEvent } from '../../domain/events/PublicationEvents';

export class AssignReviewerUseCase {
  constructor(
    private readonly repository: IPublicationRepository,
    private readonly membershipValidation: IMembershipValidationService,
    private readonly eventPublisher: IPublicationEventPublisher
  ) {}

  async execute(command: AssignReviewerCommand): Promise<void> {
    // 1. Validate Reviewer Eligibility via RPC/Contract to Membership
    const isEligible = await this.membershipValidation.canReview(command.reviewerId);
    if (!isEligible) {
      throw new Error(`Member ${command.reviewerId} is not eligible to be a reviewer.`);
    }

    // 2. Fetch Submission
    const submission = await this.repository.findSubmissionById(new SubmissionId(command.submissionId));
    if (!submission) throw new Error('Submission not found.');

    // 3. Check Conflict of Interest (e.g., author cannot review their own paper)
    if (submission.author.getValue() === command.reviewerId) {
      throw new Error('Author cannot review their own submission.');
    }

    // 4. Assign
    const assignmentId = new ReviewAssignmentId(`ASN-${Date.now()}`);
    submission.assignReviewer(assignmentId, new ReviewerId(command.reviewerId), command.deadline);

    // 5. Persist & Publish
    await this.repository.saveSubmission(submission);
    
    await this.eventPublisher.publish(
      new ReviewerAssignedEvent(
        submission.id.getValue(),
        command.reviewerId,
        submission.currentRound,
        command.deadline
      )
    );
  }
}
