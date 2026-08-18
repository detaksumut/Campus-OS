import { RecordInterviewResultCommand } from '../commands/CertificationCommands';
import { ICertificationRepository } from '../ports/ICertificationRepository';
import { ICertificationEventPublisher } from '../ports/ICertificationEventPublisher';
import { ApplicationId } from '../../domain/value-objects/CertificationValueObjects';
import { InterviewCompletedEvent } from '../../domain/events/CertificationEvents';

export class RecordInterviewResultUseCase {
  constructor(
    private readonly repository: ICertificationRepository,
    private readonly eventPublisher: ICertificationEventPublisher
  ) {}

  async execute(command: RecordInterviewResultCommand): Promise<void> {
    const application = await this.repository.findApplicationById(new ApplicationId(command.applicationId));
    if (!application) throw new Error('Application not found.');

    const interview = application.interview;
    if (!interview) throw new Error('No interview scheduled for this application.');

    // Simulating moving from SCHEDULED to IN_PROGRESS to COMPLETED
    if (interview.currentStatus === 'SCHEDULED') {
      interview.start();
    }
    
    interview.complete(command.score, command.resultNotes);
    application.completeInterview();

    await this.repository.saveApplication(application);

    await this.eventPublisher.publish(
      new InterviewCompletedEvent(application.id.getValue(), interview.id.getValue(), command.score)
    );
  }
}
