import { CreateCourseCommand } from '../commands/CurriculumCommands';
import { ICurriculumRepository } from '../ports/ICurriculumRepository';
import { CourseId } from '../../domain/value-objects/CurriculumValueObjects';
import { Course } from '../../domain/entities/CurriculumEntities';
import { CourseType } from '../../domain/types/CurriculumEnums';

export class CreateCourseUseCase {
  constructor(private readonly repository: ICurriculumRepository) {}

  async execute(command: CreateCourseCommand): Promise<void> {
    const courseId = new CourseId(`CRS-${Date.now()}`);
    const course = new Course(
      courseId,
      command.code,
      command.name,
      command.credits,
      command.type as CourseType
    );

    await this.repository.saveCourse(course);
  }
}
