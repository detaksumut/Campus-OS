import { FinalizeAwardCommand } from '../commands/AwardsCommands';
import { IAwardsRepository } from '../ports/IAwardsRepository';
import { IAwardsEventPublisher } from '../ports/IAwardsEventPublisher';
import { AwardId, NominationId } from '../../domain/value-objects/AwardsValueObjects';
import { AwardDecision } from '../../domain/entities/AwardDecision';
import { AwardDecisionType } from '../../domain/types/AwardsEnums';
import { AwardFinalizedEvent } from '../../domain/events/AwardEvents';

export class FinalizeAwardUseCase {
  constructor(
    private readonly repository: IAwardsRepository,
    private readonly eventPublisher: IAwardsEventPublisher
  ) {}

  async execute(command: FinalizeAwardCommand): Promise<void> {
    const program = await this.repository.findAwardProgramById(new AwardId(command.awardId));
    if (!program) throw new Error('Award Program not found.');

    const decision = new AwardDecision(
      new NominationId(command.nominationId),
      command.decision as AwardDecisionType,
      command.summaryRemarks
    );

    program.recordDecision(decision);

    // After all decisions are recorded, maybe we call finalizeDecisions() via another explicit call,
    // but here we just record it. If the business logic expects this to be the end:
    // program.finalizeDecisions();

    await this.repository.saveAwardProgram(program);

    await this.eventPublisher.publish(
      new AwardFinalizedEvent(program.id.getValue())
    );
  }
}
