import { CreateConferenceCommand } from '../commands/ConferenceCommands';
import { IConferenceRepository } from '../ports/IConferenceRepository';
import { IConferenceEventPublisher } from '../ports/IConferenceEventPublisher';
import { ConferenceEvent } from '../../domain/entities/ConferenceEvent';
import { ConferenceId } from '../../domain/value-objects/ConferenceValueObjects';
import { ConferenceType, ReviewMode } from '../../domain/types/ConferenceEnums';
import { ConferenceCreatedEvent } from '../../domain/events/ConferenceEvents';

export class CreateConferenceUseCase {
  constructor(
    private readonly repository: IConferenceRepository,
    private readonly eventPublisher: IConferenceEventPublisher
  ) {}

  async execute(command: CreateConferenceCommand): Promise<void> {
    const conferenceId = new ConferenceId(`CONF-${Date.now()}`);
    
    const conference = new ConferenceEvent(
      conferenceId,
      command.name,
      command.type as ConferenceType,
      command.reviewMode as ReviewMode
    );

    await this.repository.saveConference(conference);

    await this.eventPublisher.publish(
      new ConferenceCreatedEvent(conference.id.getValue(), conference.currentName)
    );
  }
}
