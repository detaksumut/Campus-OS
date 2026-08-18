import { IRegistrationRepository } from '../../domain/IRegistrationRepository';
import { SemesterRegistration, StudentProvision } from '../../domain/IRegistrationEntities';
import { IDatabaseExecutor } from '@campus-os/platform-database/src/IDatabaseExecutor';

export class RegistrationRepository implements IRegistrationRepository {
  constructor(private readonly executor: IDatabaseExecutor) {}

  async saveStudentProvision(provision: StudentProvision): Promise<void> {
    await this.executor.insert('student_provisions', provision);
  }

  async saveSemesterRegistration(registration: SemesterRegistration): Promise<void> {
    await this.executor.insert('semester_registrations', registration);
  }

  async getRegistrationById(id: string): Promise<SemesterRegistration | null> {
    const results = await this.executor.select<SemesterRegistration>({
      table: 'semester_registrations',
      where: { registrationId: id }
    });
    return results.length > 0 ? results[0] : null;
  }
}
