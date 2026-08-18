import { RegisterApplicantCommand } from '../commands/AdmissionsCommands';
import { IAdmissionsRepository } from '../ports/IAdmissionsRepository';
import { PeriodId, ApplicantId } from '../../domain/value-objects/AdmissionsValueObjects';
import { Applicant } from '../../domain/entities/Applicant';
import { AdmissionGovernancePolicy } from '../../domain/services/AdmissionsPolicies';

export class RegisterApplicantUseCase {
  constructor(
    private readonly repository: IAdmissionsRepository
  ) {}

  async execute(command: RegisterApplicantCommand): Promise<void> {
    const period = await this.repository.findPeriodById(new PeriodId(command.periodId));
    if (!period) throw new Error('Admission period not found.');

    if (!AdmissionGovernancePolicy.canAcceptApplications(period)) {
      throw new Error('This admission period is not accepting new applicants.');
    }

    const applicantId = new ApplicantId(`APPL-${Date.now()}`);
    const applicant = new Applicant(
      applicantId,
      command.name,
      command.email,
      command.phone
    );

    period.registerApplicant(applicant);

    await this.repository.savePeriod(period);
  }
}
