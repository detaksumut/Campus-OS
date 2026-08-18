import { RecordSelectionResultCommand } from '../commands/AdmissionsCommands';
import { IAdmissionsRepository } from '../ports/IAdmissionsRepository';
import { IAdmissionsEventPublisher } from '../ports/IAdmissionsEventPublisher';
import { PeriodId, AssessmentId, AssessmentResult } from '../../domain/value-objects/AdmissionsValueObjects';
import { AdmissionGovernancePolicy } from '../../domain/services/AdmissionsPolicies';
import { ApplicantEvaluatedEvent } from '../../domain/events/AdmissionsEvents';

export class RecordSelectionResultUseCase {
  constructor(
    private readonly repository: IAdmissionsRepository,
    private readonly eventPublisher: IAdmissionsEventPublisher
  ) {}

  async execute(command: RecordSelectionResultCommand): Promise<void> {
    const period = await this.repository.findPeriodById(new PeriodId(command.periodId));
    if (!period) throw new Error('Admission period not found.');

    if (!AdmissionGovernancePolicy.canEvaluate(period)) {
      throw new Error('Evaluation is not allowed at this stage of the period.');
    }

    const appIdx = period.allApplications.findIndex(a => a.id.getValue() === command.applicationId);
    if (appIdx === -1) throw new Error('Application not found.');

    const app = period.allApplications[appIdx];
    const stageIdx = app.allStages.findIndex(s => s.id === command.stageId);
    if (stageIdx === -1) throw new Error('Selection stage not found on this application.');

    const stage = app.allStages[stageIdx];
    const result = new AssessmentResult(
      new AssessmentId(`RES-${Date.now()}`),
      command.evaluatorId,
      command.score,
      command.remarks
    );

    stage.recordResult(result);
    // State is mutated on period's application tree. Save the period.
    await this.repository.savePeriod(period);

    await this.eventPublisher.publish(
      new ApplicantEvaluatedEvent(command.applicationId, command.stageId, command.score)
    );
  }
}
