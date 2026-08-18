import { Curriculum } from '../../domain/entities/Curriculum';
import { Course } from '../../domain/entities/CurriculumEntities';
import { CurriculumId, CourseId } from '../../domain/value-objects/CurriculumValueObjects';

export interface ICurriculumRepository {
  saveCurriculum(curriculum: Curriculum): Promise<void>;
  findCurriculumById(id: CurriculumId): Promise<Curriculum | null>;
  
  saveCourse(course: Course): Promise<void>;
  findCourseById(id: CourseId): Promise<Course | null>;
}
