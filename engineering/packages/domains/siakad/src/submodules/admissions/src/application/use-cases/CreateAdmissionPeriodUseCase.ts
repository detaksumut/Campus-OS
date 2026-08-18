import { CreateAdmissionPeriodCommand } from '../commands/AdmissionsCommands';
import { IAdmissionsRepository } from '../ports/IAdmissionsRepository';
import { IAdmissionsEventPublisher } from '../ports/IAdmissionsEventPublisher';
import { AdmissionPeriod } from '../../domain/entities/AdmissionPeriod';
import { PeriodId } from '../../domain/value-objects/AdmissionsValueObjects';
import { AdmissionRoute, AdmissionPeriodStatus } from '../../domain/types/AdmissionsEnums';
import { PeriodOpenedEvent } from '../../domain/events/AdmissionsEvents';

export class CreateAdmissionPeriodUseCase {
  constructor(
    private readonly repository: IAdmissionsRepository,
    private readonly eventPublisher: IAdmissionsEventPublisher
  ) {}

  async execute(command: CreateAdmissionPeriodCommand): Promise<void> {
    const periodId = new PeriodId(`PRD-${Date.now()}`);

    const period = new AdmissionPeriod(
      periodId,
      command.name,
      command.route as AdmissionRoute,
      AdmissionPeriodStatus.OPEN, // Start open for simplicity in this command
      command.academicYear,
      command.startDate,
      command.endDate
    );

    await this.repository.savePeriod(period);

    await this.eventPublisher.publish(
      new PeriodOpenedEvent(periodId.getValue(), period.currentRoute, period.targetAcademicYear)
    );
  }
}
