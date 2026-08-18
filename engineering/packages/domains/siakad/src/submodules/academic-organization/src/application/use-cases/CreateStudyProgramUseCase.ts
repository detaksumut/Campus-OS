import { CreateStudyProgramCommand } from '../commands/OrganizationCommands';
import { IOrganizationRepository } from '../ports/IOrganizationRepository';
import { IOrganizationEventPublisher } from '../ports/IOrganizationEventPublisher';
import { UniversityId, DepartmentId, StudyProgramId } from '../../domain/value-objects/OrganizationValueObjects';
import { StudyProgram } from '../../domain/entities/OrganizationEntities';
import { ProgramLevel, AccreditationLevel } from '../../domain/types/OrganizationEnums';
import { StudyProgramCreatedEvent } from '../../domain/events/OrganizationEvents';

export class CreateStudyProgramUseCase {
  constructor(
    private readonly repository: IOrganizationRepository,
    private readonly eventPublisher: IOrganizationEventPublisher
  ) {}

  async execute(command: CreateStudyProgramCommand): Promise<void> {
    const university = await this.repository.findById(new UniversityId(command.universityId));
    if (!university) throw new Error('University not found.');

    const programId = new StudyProgramId(`PROG-${Date.now()}`);
    const program = new StudyProgram(
      programId,
      new DepartmentId(command.departmentId),
      command.name,
      command.level as ProgramLevel,
      command.accreditation as AccreditationLevel
    );

    university.addStudyProgram(program);
    await this.repository.save(university);

    await this.eventPublisher.publish(
      new StudyProgramCreatedEvent(
        programId.getValue(),
        command.departmentId,
        command.name,
        command.level
      )
    );
  }
}
