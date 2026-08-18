import { SubmitProposalCommand } from '../commands/ResearchCommands';
import { IResearchRepository } from '../ports/IResearchRepository';
import { ProjectId } from '../../domain/value-objects/ResearchValueObjects';

export class SubmitProposalUseCase {
  constructor(
    private readonly repository: IResearchRepository
  ) {}

  async execute(command: SubmitProposalCommand): Promise<void> {
    const project = await this.repository.findProjectById(new ProjectId(command.projectId));
    if (!project) throw new Error('Research Project not found.');

    const proposal = project.currentProposal;
    if (!proposal) throw new Error('Project has no proposal to submit.');

    proposal.submit();

    await this.repository.saveProject(project);
  }
}
