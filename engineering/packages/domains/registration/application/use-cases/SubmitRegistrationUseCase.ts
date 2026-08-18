import { SubmitRegistrationCommand } from '../../contracts/commands/SubmitRegistrationCommand';
import { IRegistrationRepository } from '../../infrastructure/IRegistrationRepository';
import { Applicant, AdmissionStatus } from '../../domain/aggregates/Applicant';
import { PersonalData } from '../../domain/value-objects/PersonalData';
import { v4 as uuidv4 } from 'uuid';

export class SubmitRegistrationUseCase {
  constructor(private readonly repository: IRegistrationRepository) {}

  public async execute(command: SubmitRegistrationCommand): Promise<string> {
    // 1. Check if applicant already exists for this period
    const existing = await this.repository.findByUserIdAndPeriod(command.userId, command.registrationPeriodId);
    if (existing) {
      throw new Error("Applicant already registered for this period.");
    }

    // 2. Map DTO to Value Object
    const personalData = new PersonalData(
      command.personalData.fullName,
      new Date(command.personalData.dateOfBirth),
      command.personalData.gender,
      command.personalData.nationality,
      command.personalData.nationalIdNumber
    );

    // 3. Create Aggregate
    const applicantId = uuidv4();
    const applicant = new Applicant(
      applicantId,
      command.userId,
      command.registrationPeriodId,
      personalData,
      AdmissionStatus.DRAFT
    );

    // 4. Execute Domain Logic
    applicant.submit();

    // 5. Persist
    await this.repository.save(applicant);

    return applicant.applicantId;
  }
}
