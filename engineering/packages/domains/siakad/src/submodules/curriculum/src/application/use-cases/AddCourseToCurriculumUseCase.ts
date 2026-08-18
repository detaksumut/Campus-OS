import { AddCourseToCurriculumCommand } from '../commands/CurriculumCommands';
import { ICurriculumRepository } from '../ports/ICurriculumRepository';
import { CurriculumId, CourseId } from '../../domain/value-objects/CurriculumValueObjects';

export class AddCourseToCurriculumUseCase {
  constructor(private readonly repository: ICurriculumRepository) {}

  async execute(command: AddCourseToCurriculumCommand): Promise<void> {
    const curriculum = await this.repository.findCurriculumById(new CurriculumId(command.curriculumId));
    if (!curriculum) throw new Error('Curriculum not found.');

    const course = await this.repository.findCourseById(new CourseId(command.courseId));
    if (!course) throw new Error('Course not found.');

    curriculum.addCourse(course.id, command.recommendedSemester, command.isMandatory);
    await this.repository.saveCurriculum(curriculum);
  }
}
