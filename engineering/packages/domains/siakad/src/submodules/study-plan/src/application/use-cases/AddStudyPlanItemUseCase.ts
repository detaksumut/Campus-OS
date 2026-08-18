import { AddStudyPlanItemCommand } from '../commands/StudyPlanCommands';
import { IStudyPlanRepository } from '../ports/IStudyPlanRepository';
import { StudyPlanId, ClassSectionId } from '../../domain/value-objects/StudyPlanValueObjects';

export class AddStudyPlanItemUseCase {
  constructor(private readonly repository: IStudyPlanRepository) {}

  async execute(command: AddStudyPlanItemCommand): Promise<void> {
    const plan = await this.repository.findById(new StudyPlanId(command.studyPlanId));
    if (!plan) throw new Error('Study Plan not found.');
    
    plan.addItem(new ClassSectionId(command.classSectionId), command.isMandatory);
    await this.repository.save(plan);
  }
}
