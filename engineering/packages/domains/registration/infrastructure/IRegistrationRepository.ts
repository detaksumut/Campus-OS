import { Applicant } from '../../domain/aggregates/Applicant';

export interface IRegistrationRepository {
  findById(applicantId: string): Promise<Applicant | null>;
  save(applicant: Applicant): Promise<void>;
  findByUserIdAndPeriod(userId: string, periodId: string): Promise<Applicant | null>;
}
