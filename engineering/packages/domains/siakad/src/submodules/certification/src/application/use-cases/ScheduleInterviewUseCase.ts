import { ScheduleInterviewCommand } from '../commands/CertificationCommands';
import { ICertificationRepository } from '../ports/ICertificationRepository';
import { IMembershipValidationService } from '../ports/IMembershipValidationService';
import { ICertificationEventPublisher } from '../ports/ICertificationEventPublisher';
import { ApplicationId, InterviewId, AssessorId } from '../../domain/value-objects/CertificationValueObjects';
import { InterviewSession } from '../../domain/entities/InterviewSession';
import { AssessmentPanel } from '../../domain/entities/AssessmentPanel';
import { InterviewScheduledEvent } from '../../domain/events/CertificationEvents';

export class ScheduleInterviewUseCase {
  constructor(
    private readonly repository: ICertificationRepository,
    private readonly membershipValidation: IMembershipValidationService,
    private readonly eventPublisher: ICertificationEventPublisher
  ) {}

  async execute(command: ScheduleInterviewCommand): Promise<void> {
    const application = await this.repository.findApplicationById(new ApplicationId(command.applicationId));
    if (!application) throw new Error('Application not found.');

    // Validate Panelists
    const panel = new AssessmentPanel();
    for (const assessorId of command.assessorIds) {
      const isEligible = await this.membershipValidation.canAssess(assessorId, application.program.getValue());
      if (!isEligible) {
        throw new Error(`Member ${assessorId} is not eligible to assess program ${application.program.getValue()}`);
      }
      panel.addAssessor(new AssessorId(assessorId));
    }

    const interviewId = new InterviewId(`INT-${Date.now()}`);
    const interview = new InterviewSession(interviewId, command.scheduledTime, panel);
    
    application.scheduleInterview(interview);

    await this.repository.saveApplication(application);

    await this.eventPublisher.publish(
      new InterviewScheduledEvent(application.id.getValue(), interviewId.getValue())
    );
  }
}
