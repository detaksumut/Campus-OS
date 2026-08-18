import { PublishArticleCommand } from '../commands/PublicationCommands';
import { IPublicationRepository } from '../ports/IPublicationRepository';
import { IPublicationEventPublisher } from '../ports/IPublicationEventPublisher';
import { SubmissionId } from '../../domain/value-objects/PublicationValueObjects';
import { ArticlePublishedEvent } from '../../domain/events/PublicationEvents';
import { SubmissionStatus } from '../../domain/types/PublicationEnums';

export class PublishArticleUseCase {
  constructor(
    private readonly repository: IPublicationRepository,
    private readonly eventPublisher: IPublicationEventPublisher
  ) {}

  async execute(command: PublishArticleCommand): Promise<void> {
    const submission = await this.repository.findSubmissionById(new SubmissionId(command.submissionId));
    if (!submission) throw new Error('Submission not found.');

    // Only ACCEPTED submissions can be published
    if (submission.currentStatus !== SubmissionStatus.ACCEPTED) {
      throw new Error(`Cannot publish submission with status: ${submission.currentStatus}. Must be ACCEPTED.`);
    }

    // Direct state mutation for terminal status (simulated behavior since it wasn't strictly in domain methods)
    submission['status'] = SubmissionStatus.PUBLISHED;

    await this.repository.saveSubmission(submission);

    await this.eventPublisher.publish(
      new ArticlePublishedEvent(submission.id.getValue())
    );
  }
}
