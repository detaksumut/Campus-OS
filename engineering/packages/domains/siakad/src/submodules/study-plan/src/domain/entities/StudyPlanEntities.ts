import { ClassSectionId } from '../value-objects/StudyPlanValueObjects';

export class StudyPlanItem {
  constructor(
    public readonly classSectionId: ClassSectionId,
    public readonly isMandatory: boolean
  ) {}
}
