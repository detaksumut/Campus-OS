import { ScheduleExamCommand } from '../commands/CertificationCommands';
import { ICertificationRepository } from '../ports/ICertificationRepository';
import { ICertificationEventPublisher } from '../ports/ICertificationEventPublisher';
import { ApplicationId, ExamId } from '../../domain/value-objects/CertificationValueObjects';
import { ExamSession } from '../../domain/entities/ExamSession';
import { ExamStatus } from '../../domain/types/CertificationEnums';
import { ExamScheduledEvent } from '../../domain/events/CertificationEvents';

export class ScheduleExamUseCase {
  constructor(
    private readonly repository: ICertificationRepository,
    private readonly eventPublisher: ICertificationEventPublisher
  ) {}

  async execute(command: ScheduleExamCommand): Promise<void> {
    const application = await this.repository.findApplicationById(new ApplicationId(command.applicationId));
    if (!application) throw new Error('Application not found.');

    const examId = new ExamId(`EXM-${Date.now()}`);
    const exam = new ExamSession(examId, ExamStatus.SCHEDULED, command.scheduledStart, command.timeLimitMinutes);
    
    application.scheduleExam(exam);

    await this.repository.saveApplication(application);

    await this.eventPublisher.publish(
      new ExamScheduledEvent(application.id.getValue(), examId.getValue())
    );
  }
}
