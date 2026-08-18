import { SubmitManuscriptCommand } from '../commands/PublicationCommands';
import { IPublicationRepository } from '../ports/IPublicationRepository';
import { IPublicationEventPublisher } from '../ports/IPublicationEventPublisher';
import { Submission } from '../../domain/entities/Submission';
import { Manuscript } from '../../domain/entities/Manuscript';
import { SubmissionId, AuthorId } from '../../domain/value-objects/PublicationValueObjects';
import { ManuscriptSubmittedEvent } from '../../domain/events/PublicationEvents';

export class SubmitManuscriptUseCase {
  constructor(
    private readonly repository: IPublicationRepository,
    private readonly eventPublisher: IPublicationEventPublisher
  ) {}

  async execute(command: SubmitManuscriptCommand): Promise<void> {
    const submissionId = new SubmissionId(`SUB-${Date.now()}`);
    const authorId = new AuthorId(command.authorId);
    
    // Create new Submission aggregate
    const submission = new Submission(submissionId, authorId);
    
    // Create first manuscript version
    const manuscript = new Manuscript(
      command.title,
      command.abstractText,
      command.fileUrl,
      command.checksum,
      1
    );

    // Act
    submission.submitInitialManuscript(manuscript);
    // Optionally start screening automatically
    submission.startScreening();

    // Persist
    await this.repository.saveSubmission(submission);

    // Publish
    await this.eventPublisher.publish(
      new ManuscriptSubmittedEvent(
        submission.id.getValue(),
        submission.author.getValue(),
        manuscript.currentVersion
      )
    );
  }
}
