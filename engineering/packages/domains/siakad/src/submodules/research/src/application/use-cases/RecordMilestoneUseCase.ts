import { RecordMilestoneCommand } from '../commands/ResearchCommands';
import { IResearchRepository } from '../ports/IResearchRepository';
import { IResearchEventPublisher } from '../ports/IResearchEventPublisher';
import { ProjectId, MilestoneId } from '../../domain/value-objects/ResearchValueObjects';
import { ResearchMilestone } from '../../domain/entities/ResearchMilestone';
import { ResearchGovernancePolicy } from '../../domain/services/ResearchGovernancePolicy';
import { MilestoneAchievedEvent } from '../../domain/events/ResearchEvents';

export class RecordMilestoneUseCase {
  constructor(
    private readonly repository: IResearchRepository,
    private readonly eventPublisher: IResearchEventPublisher
  ) {}

  async execute(command: RecordMilestoneCommand): Promise<void> {
    const project = await this.repository.findProjectById(new ProjectId(command.projectId));
    if (!project) throw new Error('Research Project not found.');

    const milestoneId = new MilestoneId(`MLS-${Date.now()}`);
    const dependency = command.dependentMilestoneId ? new MilestoneId(command.dependentMilestoneId) : null;
    
    const milestone = new ResearchMilestone(
      milestoneId,
      command.milestoneTitle,
      command.description,
      command.targetDate,
      dependency
    );

    project.addMilestone(milestone);

    // In a real scenario, this command might be split into 'CreateMilestone' and 'AchieveMilestone'.
    // For this flow, if it's created, we immediately try to start and achieve it based on governance.
    if (ResearchGovernancePolicy.canStartMilestone(project, milestoneId.getValue())) {
      milestone.start();
      milestone.achieve();
    } else {
      throw new Error(`Cannot start milestone. Dependencies are not met.`);
    }

    await this.repository.saveProject(project);

    await this.eventPublisher.publish(
      new MilestoneAchievedEvent(project.id.getValue(), milestoneId.getValue())
    );
  }
}
