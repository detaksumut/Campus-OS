import { AssignResearchMemberCommand } from '../commands/ResearchCommands';
import { IResearchRepository } from '../ports/IResearchRepository';
import { IMembershipValidationService } from '../ports/IMembershipValidationService';
import { IResearchEventPublisher } from '../ports/IResearchEventPublisher';
import { ProjectId, MemberId } from '../../domain/value-objects/ResearchValueObjects';
import { ResearchMember } from '../../domain/entities/ResearchMember';
import { MemberRole } from '../../domain/types/ResearchEnums';
import { MemberAssignedEvent } from '../../domain/events/ResearchEvents';

export class AssignResearchMemberUseCase {
  constructor(
    private readonly repository: IResearchRepository,
    private readonly membershipValidation: IMembershipValidationService,
    private readonly eventPublisher: IResearchEventPublisher
  ) {}

  async execute(command: AssignResearchMemberCommand): Promise<void> {
    const isEligible = await this.membershipValidation.canParticipateInResearch(command.memberId);
    if (!isEligible) throw new Error(`Member ${command.memberId} is not eligible to participate in research.`);

    const project = await this.repository.findProjectById(new ProjectId(command.projectId));
    if (!project) throw new Error('Research Project not found.');

    const member = new ResearchMember(new MemberId(command.memberId), command.role as MemberRole);
    project.addMember(member);

    await this.repository.saveProject(project);

    await this.eventPublisher.publish(
      new MemberAssignedEvent(project.id.getValue(), command.memberId, command.role)
    );
  }
}
