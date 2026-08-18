import { CreateAwardProgramCommand } from '../commands/AwardsCommands';
import { IAwardsRepository } from '../ports/IAwardsRepository';
import { IAwardsEventPublisher } from '../ports/IAwardsEventPublisher';
import { AwardProgram } from '../../domain/entities/AwardProgram';
import { AwardId } from '../../domain/value-objects/AwardsValueObjects';
import { AwardCategory, AwardCycle } from '../../domain/types/AwardsEnums';
import { AwardProgramCreatedEvent } from '../../domain/events/AwardEvents';

export class CreateAwardProgramUseCase {
  constructor(
    private readonly repository: IAwardsRepository,
    private readonly eventPublisher: IAwardsEventPublisher
  ) {}

  async execute(command: CreateAwardProgramCommand): Promise<void> {
    const awardId = new AwardId(`AWD-${Date.now()}`);
    
    const program = new AwardProgram(
      awardId,
      command.name,
      command.category as AwardCategory,
      command.cycle as AwardCycle,
      command.allowSelfNomination
    );

    await this.repository.saveAwardProgram(program);

    await this.eventPublisher.publish(
      new AwardProgramCreatedEvent(program.id.getValue(), program.currentName)
    );
  }
}
