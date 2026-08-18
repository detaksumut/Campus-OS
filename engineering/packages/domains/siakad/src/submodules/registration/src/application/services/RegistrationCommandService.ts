import { IRegistrationRepository } from '../../domain/IRegistrationRepository';
import { ITransactionManager } from '../ITransactionManager';
import { RegistrationWorkflowService, StudentProvision, SemesterRegistration } from '../../IRegistrationEntities';
import { RegisterStudentCommand } from '../commands/RegisterStudentCommand';
import { RegistrationResponse } from '../dto/RegistrationResponse';
import { RegistrationMapper } from '../mappers/RegistrationMapper';

export class RegistrationCommandService {
  constructor(
    private readonly repository: IRegistrationRepository,
    private readonly workflowService: RegistrationWorkflowService,
    private readonly transactionManager: ITransactionManager
  ) {}

  async registerStudent(command: RegisterStudentCommand): Promise<RegistrationResponse> {
    const { applicantId, studyProgramId, generation } = command.request;
    
    return await this.transactionManager.executeInTransaction(async (tx) => {
      // 1. Domain Logic: Process Enrollment rules
      await this.workflowService.processNewStudentEnrollment(applicantId, studyProgramId, generation);
      
      // 2. Generate Provision Record
      const provision: StudentProvision = {
        studentProvisionId: crypto.randomUUID(),
        applicantId,
        generatedNIM: `${generation}-${studyProgramId.substring(0,3)}-${Math.floor(Math.random() * 1000)}`,
        studyProgramId,
        admissionGeneration: generation
      };
      await this.repository.saveStudentProvision(provision);

      // 3. Create initial Semester Registration
      const registration: SemesterRegistration = {
        registrationId: crypto.randomUUID(),
        studentId: provision.generatedNIM, 
        academicTermId: 'TERM-2027-GASAL', 
        registrationType: 'NEW_STUDENT',
        registrationStatus: 'DRAFT',
        studentAcademicStatus: 'ACTIVE',
        registrationDate: new Date().toISOString(),
        remarks: 'Auto-provisioned from PMB'
      };
      await this.repository.saveSemesterRegistration(registration);
      
      // 4. Return DTO (Not aggregate)
      return RegistrationMapper.toResponseDTO(registration);
    });
  }
}
