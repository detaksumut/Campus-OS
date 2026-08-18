import { AdmissionPeriod } from '../../domain/entities/AdmissionPeriod';
import { PeriodId } from '../../domain/value-objects/AdmissionsValueObjects';

export interface IAdmissionsRepository {
  savePeriod(period: AdmissionPeriod): Promise<void>;
  findPeriodById(id: PeriodId): Promise<AdmissionPeriod | null>;
}
