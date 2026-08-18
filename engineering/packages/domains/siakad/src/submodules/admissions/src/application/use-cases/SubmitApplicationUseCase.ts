import { SubmitApplicationCommand } from '../commands/AdmissionsCommands';
import { IAdmissionsRepository } from '../ports/IAdmissionsRepository';
import { IAdmissionsEventPublisher } from '../ports/IAdmissionsEventPublisher';
import { PeriodId, ApplicantId, ApplicationId, ProgramChoice } from '../../domain/value-objects/AdmissionsValueObjects';
import { Application } from '../../domain/entities/Application';
import { AdmissionGovernancePolicy } from '../../domain/services/AdmissionsPolicies';
import { AdmissionDecision } from '../../domain/types/AdmissionsEnums';
import { ApplicationSubmittedEvent } from '../../domain/events/AdmissionsEvents';

export class SubmitApplicationUseCase {
  constructor(
    private readonly repository: IAdmissionsRepository,
    private readonly eventPublisher: IAdmissionsEventPublisher
  ) {}

  async execute(command: SubmitApplicationCommand): Promise<void> {
    const period = await this.repository.findPeriodById(new PeriodId(command.periodId));
    if (!period) throw new Error('Admission period not found.');

    if (!AdmissionGovernancePolicy.canAcceptApplications(period)) {
      throw new Error('This admission period is not accepting applications.');
    }

    const choices = command.programChoices.map(c => new ProgramChoice(c.programCode, c.priority));
    const applicationId = new ApplicationId(`APP-${Date.now()}`);
    
    const application = new Application(
      applicationId,
      new ApplicantId(command.applicantId),
      choices,
      AdmissionDecision.PENDING
    );

    period.submitApplication(application);

    await this.repository.savePeriod(period);

    await this.eventPublisher.publish(
      new ApplicationSubmittedEvent(
        applicationId.getValue(),
        command.applicantId,
        choices.map(c => c.programCode)
      )
    );
  }
}
