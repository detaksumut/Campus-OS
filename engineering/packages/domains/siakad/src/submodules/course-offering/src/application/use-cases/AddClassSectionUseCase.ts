import { AddClassSectionCommand } from '../commands/CourseOfferingCommands';
import { ICourseOfferingRepository } from '../ports/ICourseOfferingRepository';
import { CourseOfferingId, ClassSectionId } from '../../domain/value-objects/CourseOfferingValueObjects';
import { ClassSection } from '../../domain/entities/CourseOfferingEntities';

export class AddClassSectionUseCase {
  constructor(private readonly repository: ICourseOfferingRepository) {}

  async execute(command: AddClassSectionCommand): Promise<void> {
    const offering = await this.repository.findById(new CourseOfferingId(command.courseOfferingId));
    if (!offering) throw new Error('Course Offering not found.');
    const sectionId = new ClassSectionId(`SEC-${Date.now()}`);
    const section = new ClassSection(sectionId, command.name, command.capacity);
    offering.addSection(section);
    await this.repository.save(offering);
  }
}
