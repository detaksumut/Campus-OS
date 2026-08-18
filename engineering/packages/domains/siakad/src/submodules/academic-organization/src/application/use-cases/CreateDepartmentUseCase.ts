import { CreateDepartmentCommand } from '../commands/OrganizationCommands';
import { IOrganizationRepository } from '../ports/IOrganizationRepository';
import { UniversityId, FacultyId, DepartmentId } from '../../domain/value-objects/OrganizationValueObjects';
import { Department } from '../../domain/entities/OrganizationEntities';

export class CreateDepartmentUseCase {
  constructor(private readonly repository: IOrganizationRepository) {}

  async execute(command: CreateDepartmentCommand): Promise<void> {
    const university = await this.repository.findById(new UniversityId(command.universityId));
    if (!university) throw new Error('University not found.');

    const departmentId = new DepartmentId(`DEPT-${Date.now()}`);
    const department = new Department(
      departmentId,
      new FacultyId(command.facultyId),
      command.name
    );

    university.addDepartment(department);
    await this.repository.save(university);
  }
}
