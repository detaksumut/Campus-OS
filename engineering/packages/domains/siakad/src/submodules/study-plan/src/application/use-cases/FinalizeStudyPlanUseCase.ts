import { FinalizeStudyPlanCommand } from '../commands/StudyPlanCommands';
import { IStudyPlanRepository } from '../ports/IStudyPlanRepository';
import { IStudyPlanEventPublisher } from '../ports/IStudyPlanEventPublisher';
import { StudyPlanId } from '../../domain/value-objects/StudyPlanValueObjects';
import { StudyPlanFinalizedEvent } from '../../domain/events/StudyPlanEvents';

export class FinalizeStudyPlanUseCase {
  constructor(
    private readonly repository: IStudyPlanRepository,
    private readonly eventPublisher: IStudyPlanEventPublisher
  ) {}

  async execute(command: FinalizeStudyPlanCommand): Promise<void> {
    const plan = await this.repository.findById(new StudyPlanId(command.studyPlanId));
    if (!plan) throw new Error('Study Plan not found.');
    
    plan.finalize();
    await this.repository.save(plan);
    
    const sectionIds = plan.allItems.map(i => i.classSectionId.getValue());
    
    await this.eventPublisher.publish(
      new StudyPlanFinalizedEvent(
        plan.id.getValue(),
        plan.studentId.getValue(),
        plan.academicPeriodId.getValue(),
        sectionIds
      )
    );
  }
}
