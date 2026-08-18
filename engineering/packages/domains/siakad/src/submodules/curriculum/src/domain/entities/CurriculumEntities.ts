import { CourseId, LearningOutcomeId, PrerequisiteId } from '../value-objects/CurriculumValueObjects';
import { CourseType } from '../types/CurriculumEnums';

export class LearningOutcome {
  constructor(
    public readonly id: LearningOutcomeId,
    public readonly code: string, // e.g., CPL-01
    public readonly description: string
  ) {}
}

export class CourseLearningOutcome {
  constructor(
    public readonly id: LearningOutcomeId,
    public readonly code: string, // e.g., CPMK-01
    public readonly description: string
  ) {}
}

export class Prerequisite {
  constructor(
    public readonly id: PrerequisiteId,
    public readonly requiredCourseId: CourseId,
    public readonly minimumGrade: string
  ) {}
}

export class Course {
  private cpmkList: CourseLearningOutcome[] = [];
  private prerequisites: Prerequisite[] = [];

  constructor(
    public readonly id: CourseId,
    public readonly code: string,
    public readonly name: string,
    public readonly credits: number,
    public readonly type: CourseType
  ) {}

  get allCpmk(): ReadonlyArray<CourseLearningOutcome> { return this.cpmkList; }
  get allPrerequisites(): ReadonlyArray<Prerequisite> { return this.prerequisites; }

  addCpmk(cpmk: CourseLearningOutcome): void {
    this.cpmkList.push(cpmk);
  }

  addPrerequisite(prerequisite: Prerequisite): void {
    this.prerequisites.push(prerequisite);
  }
}

export class CurriculumCourse {
  constructor(
    public readonly courseId: CourseId,
    public readonly recommendedSemester: number,
    public readonly isMandatory: boolean
  ) {}
}
