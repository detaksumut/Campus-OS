import { RegisterResearchOutputCommand } from '../commands/ResearchCommands';
import { IResearchRepository } from '../ports/IResearchRepository';
import { IPublicationValidationService } from '../ports/IPublicationValidationService';
import { IResearchEventPublisher } from '../ports/IResearchEventPublisher';
import { ProjectId, OutputId, PublicationReference } from '../../domain/value-objects/ResearchValueObjects';
import { ResearchOutput } from '../../domain/entities/ResearchOutput';
import { OutputType } from '../../domain/types/ResearchEnums';
import { OutputRegisteredEvent } from '../../domain/events/ResearchEvents';

export class RegisterResearchOutputUseCase {
  constructor(
    private readonly repository: IResearchRepository,
    private readonly publicationValidation: IPublicationValidationService,
    private readonly eventPublisher: IResearchEventPublisher
  ) {}

  async execute(command: RegisterResearchOutputCommand): Promise<void> {
    const project = await this.repository.findProjectById(new ProjectId(command.projectId));
    if (!project) throw new Error('Research Project not found.');

    const outputId = new OutputId(`OUT-${Date.now()}`);
    const output = new ResearchOutput(
      outputId,
      command.outputType as OutputType,
      command.title,
      command.description
    );

    if (command.publicationSubmissionId) {
      const pubRef = new PublicationReference(command.publicationSubmissionId);
      output.linkPublication(pubRef);

      // Validate status directly with Publication port
      const isPublished = await this.publicationValidation.isPublished(pubRef.getValue());
      if (isPublished) {
        output.markAsVerified();
      }
    } else {
      // Non-publication outputs are assumed verified internally or through another process
      output.markAsVerified();
    }

    project.registerOutput(output);

    await this.repository.saveProject(project);

    await this.eventPublisher.publish(
      new OutputRegisteredEvent(project.id.getValue(), outputId.getValue(), command.outputType)
    );
  }
}
