import { DraftStudyPlanCommand } from '../commands/StudyPlanCommands';
import { IStudyPlanRepository } from '../ports/IStudyPlanRepository';
import { StudyPlanId, StudentId, AcademicPeriodId } from '../../domain/value-objects/StudyPlanValueObjects';
import { StudyPlan } from '../../domain/entities/StudyPlan';
import { StudyPlanStatus } from '../../domain/types/StudyPlanEnums';

export class DraftStudyPlanUseCase {
  constructor(private readonly repository: IStudyPlanRepository) {}

  async execute(command: DraftStudyPlanCommand): Promise<void> {
    const planId = new StudyPlanId(`KRS-${Date.now()}`);
    const plan = new StudyPlan(
      planId,
      new StudentId(command.studentId),
      new AcademicPeriodId(command.academicPeriodId),
      StudyPlanStatus.DRAFT
    );
    await this.repository.save(plan);
  }
}
