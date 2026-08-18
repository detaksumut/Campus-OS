import { CreateFacultyCommand } from '../commands/OrganizationCommands';
import { IOrganizationRepository } from '../ports/IOrganizationRepository';
import { IOrganizationEventPublisher } from '../ports/IOrganizationEventPublisher';
import { UniversityId, FacultyId } from '../../domain/value-objects/OrganizationValueObjects';
import { Faculty } from '../../domain/entities/OrganizationEntities';
import { FacultyCreatedEvent } from '../../domain/events/OrganizationEvents';

export class CreateFacultyUseCase {
  constructor(
    private readonly repository: IOrganizationRepository,
    private readonly eventPublisher: IOrganizationEventPublisher
  ) {}

  async execute(command: CreateFacultyCommand): Promise<void> {
    const university = await this.repository.findById(new UniversityId(command.universityId));
    if (!university) throw new Error('University not found.');

    const facultyId = new FacultyId(`FAC-${Date.now()}`);
    const faculty = new Faculty(facultyId, command.name);

    university.addFaculty(faculty);
    await this.repository.save(university);

    await this.eventPublisher.publish(
      new FacultyCreatedEvent(facultyId.getValue(), command.name)
    );
  }
}
