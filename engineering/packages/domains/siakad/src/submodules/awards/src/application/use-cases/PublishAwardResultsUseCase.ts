import { PublishAwardResultsCommand } from '../commands/AwardsCommands';
import { IAwardsRepository } from '../ports/IAwardsRepository';
import { IAwardsEventPublisher } from '../ports/IAwardsEventPublisher';
import { AwardId } from '../../domain/value-objects/AwardsValueObjects';
import { AwardGovernancePolicy } from '../../domain/services/AwardPolicies';
import { AwardResultsPublishedEvent } from '../../domain/events/AwardEvents';

export class PublishAwardResultsUseCase {
  constructor(
    private readonly repository: IAwardsRepository,
    private readonly eventPublisher: IAwardsEventPublisher
  ) {}

  async execute(command: PublishAwardResultsCommand): Promise<void> {
    const program = await this.repository.findAwardProgramById(new AwardId(command.awardId));
    if (!program) throw new Error('Award Program not found.');

    if (!AwardGovernancePolicy.canFinalizeDecisions(program)) {
      throw new Error('Cannot publish results. Missing decisions or invalid state.');
    }

    program.publishResults();

    await this.repository.saveAwardProgram(program);

    const winners = program.allRecipients.map(r => r.recipientId);

    await this.eventPublisher.publish(
      new AwardResultsPublishedEvent(program.id.getValue(), winners)
    );
  }
}
