import { CurriculumId, StudyProgramId, CourseId } from '../value-objects/CurriculumValueObjects';
import { CurriculumCourse, LearningOutcome } from './CurriculumEntities';
import { CurriculumStatus } from '../types/CurriculumEnums';

export class Curriculum {
  private courses: CurriculumCourse[] = [];
  private cplList: LearningOutcome[] = [];

  constructor(
    public readonly id: CurriculumId,
    public readonly studyProgramId: StudyProgramId,
    public readonly name: string,
    public readonly startYear: string,
    private status: CurriculumStatus = CurriculumStatus.DRAFT
  ) {}

  get currentStatus(): CurriculumStatus { return this.status; }
  get allCourses(): ReadonlyArray<CurriculumCourse> { return this.courses; }
  get allCpl(): ReadonlyArray<LearningOutcome> { return this.cplList; }

  activate(): void {
    this.status = CurriculumStatus.ACTIVE;
  }

  addCpl(cpl: LearningOutcome): void {
    this.cplList.push(cpl);
  }

  addCourse(courseId: CourseId, recommendedSemester: number, isMandatory: boolean): void {
    const existing = this.courses.find(c => c.courseId.getValue() === courseId.getValue());
    if (existing) {
      throw new Error('Course is already part of this Curriculum.');
    }
    this.courses.push(new CurriculumCourse(courseId, recommendedSemester, isMandatory));
  }
}
