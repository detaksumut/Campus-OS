import { AssignEvaluatorCommand } from '../commands/AwardsCommands';
import { IAwardsRepository } from '../ports/IAwardsRepository';
import { IMembershipValidationService } from '../ports/IMembershipValidationService';
import { AwardId, CommitteeId } from '../../domain/value-objects/AwardsValueObjects';
import { AwardCommittee } from '../../domain/entities/AwardCommittee';

export class AssignEvaluatorUseCase {
  constructor(
    private readonly repository: IAwardsRepository,
    private readonly membershipValidation: IMembershipValidationService
  ) {}

  async execute(command: AssignEvaluatorCommand): Promise<void> {
    const isEligible = await this.membershipValidation.canServeOnCommittee(command.evaluatorId);
    if (!isEligible) throw new Error(`Member ${command.evaluatorId} is not eligible to serve on an award committee.`);

    const program = await this.repository.findAwardProgramById(new AwardId(command.awardId));
    if (!program) throw new Error('Award Program not found.');

    const committeeId = new CommitteeId(`CMT-${Date.now()}`);
    const member = new AwardCommittee(committeeId, command.evaluatorId, command.role);
    
    program.addCommitteeMember(member);

    await this.repository.saveAwardProgram(program);
  }
}
