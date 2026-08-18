import { CourseOfferingId, CourseId, AcademicPeriodId } from '../value-objects/CourseOfferingValueObjects';
import { ClassSection } from './CourseOfferingEntities';
import { OfferingStatus } from '../types/CourseOfferingEnums';

export class CourseOffering {
  private sections: ClassSection[] = [];

  constructor(
    public readonly id: CourseOfferingId,
    public readonly courseId: CourseId,
    public readonly academicPeriodId: AcademicPeriodId,
    private status: OfferingStatus = OfferingStatus.DRAFT
  ) {}

  get currentStatus(): OfferingStatus { return this.status; }
  get allSections(): ReadonlyArray<ClassSection> { return this.sections; }

  addSection(section: ClassSection): void {
    if (this.status !== OfferingStatus.DRAFT) {
      throw new Error('Can only add sections while in DRAFT status.');
    }
    this.sections.push(section);
  }

  publish(): void {
    if (this.sections.length === 0) {
      throw new Error('Cannot publish an offering with no sections.');
    }
    this.status = OfferingStatus.PUBLISHED;
  }
}
