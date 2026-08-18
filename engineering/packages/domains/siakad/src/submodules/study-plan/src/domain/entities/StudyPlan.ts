import { StudyPlanId, StudentId, AcademicPeriodId, ClassSectionId } from '../value-objects/StudyPlanValueObjects';
import { StudyPlanItem } from './StudyPlanEntities';
import { StudyPlanStatus } from '../types/StudyPlanEnums';

export class StudyPlan {
  private items: StudyPlanItem[] = [];

  constructor(
    public readonly id: StudyPlanId,
    public readonly studentId: StudentId,
    public readonly academicPeriodId: AcademicPeriodId,
    private status: StudyPlanStatus = StudyPlanStatus.DRAFT
  ) {}

  get currentStatus(): StudyPlanStatus { return this.status; }
  get allItems(): ReadonlyArray<StudyPlanItem> { return this.items; }

  addItem(classSectionId: ClassSectionId, isMandatory: boolean): void {
    if (this.status !== StudyPlanStatus.DRAFT && this.status !== StudyPlanStatus.REVISED) {
      throw new Error('Can only edit plan when it is in DRAFT or REVISED status.');
    }
    if (this.items.some(i => i.classSectionId.getValue() === classSectionId.getValue())) {
      throw new Error('Class section is already in the study plan.');
    }
    this.items.push(new StudyPlanItem(classSectionId, isMandatory));
  }

  submit(): void {
    if (this.status !== StudyPlanStatus.DRAFT && this.status !== StudyPlanStatus.REVISED) {
      throw new Error('Can only submit from DRAFT or REVISED.');
    }
    this.status = StudyPlanStatus.SUBMITTED;
  }

  approve(): void {
    if (this.status !== StudyPlanStatus.SUBMITTED) {
      throw new Error('Can only approve SUBMITTED plans.');
    }
    this.status = StudyPlanStatus.APPROVED;
  }
  
  reject(): void {
    if (this.status !== StudyPlanStatus.SUBMITTED) {
      throw new Error('Can only reject SUBMITTED plans.');
    }
    this.status = StudyPlanStatus.REJECTED;
  }

  finalize(): void {
    if (this.status !== StudyPlanStatus.APPROVED) {
      throw new Error('Can only finalize APPROVED plans.');
    }
    this.status = StudyPlanStatus.FINALIZED;
  }
}
