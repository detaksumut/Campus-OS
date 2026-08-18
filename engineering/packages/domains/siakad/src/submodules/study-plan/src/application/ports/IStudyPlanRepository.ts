import { StudyPlan } from '../../domain/entities/StudyPlan';
import { StudyPlanId } from '../../domain/value-objects/StudyPlanValueObjects';

export interface IStudyPlanRepository {
  save(plan: StudyPlan): Promise<void>;
  findById(id: StudyPlanId): Promise<StudyPlan | null>;
}
