import { SemesterRegistration, StudentProvision } from '../IRegistrationEntities';

export interface IRegistrationRepository {
  saveStudentProvision(provision: StudentProvision): Promise<void>;
  saveSemesterRegistration(registration: SemesterRegistration): Promise<void>;
  
  getSemesterRegistrationById(registrationId: string): Promise<SemesterRegistration | null>;
  updateSemesterRegistrationStatus(registrationId: string, status: string): Promise<void>;
}
