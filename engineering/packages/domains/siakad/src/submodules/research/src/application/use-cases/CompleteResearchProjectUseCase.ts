import { CompleteResearchProjectCommand } from '../commands/ResearchCommands';
import { IResearchRepository } from '../ports/IResearchRepository';
import { ProjectId } from '../../domain/value-objects/ResearchValueObjects';
import { ResearchGovernancePolicy } from '../../domain/services/ResearchGovernancePolicy';

export class CompleteResearchProjectUseCase {
  constructor(
    private readonly repository: IResearchRepository
  ) {}

  async execute(command: CompleteResearchProjectCommand): Promise<void> {
    const project = await this.repository.findProjectById(new ProjectId(command.projectId));
    if (!project) throw new Error('Research Project not found.');

    if (!ResearchGovernancePolicy.canCompleteProject(project)) {
      throw new Error('Project cannot be completed. Milestones or Outputs criteria not met.');
    }

    project.completeProject();

    await this.repository.saveProject(project);
  }
}
