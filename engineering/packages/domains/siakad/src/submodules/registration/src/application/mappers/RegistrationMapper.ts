import { SemesterRegistration } from '../../IRegistrationEntities';
import { RegistrationResponse } from '../dto/RegistrationResponse';

export class RegistrationMapper {
  static toResponseDTO(domain: SemesterRegistration): RegistrationResponse {
    return {
      registrationId: domain.registrationId,
      studentId: domain.studentId,
      status: domain.registrationStatus,
      term: domain.academicTermId,
      createdAt: domain.registrationDate
    };
  }
}
