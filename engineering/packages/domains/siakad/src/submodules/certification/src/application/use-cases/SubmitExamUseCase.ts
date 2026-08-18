import { SubmitExamCommand } from '../commands/CertificationCommands';
import { ICertificationRepository } from '../ports/ICertificationRepository';
import { ICertificationEventPublisher } from '../ports/ICertificationEventPublisher';
import { ApplicationId } from '../../domain/value-objects/CertificationValueObjects';
import { ExamCompletedEvent } from '../../domain/events/CertificationEvents';

export class SubmitExamUseCase {
  constructor(
    private readonly repository: ICertificationRepository,
    private readonly eventPublisher: ICertificationEventPublisher
  ) {}

  async execute(command: SubmitExamCommand): Promise<void> {
    const application = await this.repository.findApplicationById(new ApplicationId(command.applicationId));
    if (!application) throw new Error('Application not found.');

    const exam = application.exam;
    if (!exam) throw new Error('No exam scheduled for this application.');

    // Simulating moving from SCHEDULED to IN_PROGRESS to SUBMITTED for the sake of the domain rules
    if (exam.currentStatus === 'SCHEDULED') {
      exam.start();
    }
    
    exam.submit(command.score);
    application.completeExam();

    await this.repository.saveApplication(application);

    await this.eventPublisher.publish(
      new ExamCompletedEvent(application.id.getValue(), exam.id.getValue(), command.score)
    );
  }
}
