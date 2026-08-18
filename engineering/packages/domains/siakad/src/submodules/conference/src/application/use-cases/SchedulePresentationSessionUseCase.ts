import { SchedulePresentationSessionCommand } from '../commands/ConferenceCommands';
import { IConferenceRepository } from '../ports/IConferenceRepository';
import { IConferenceEventPublisher } from '../ports/IConferenceEventPublisher';
import { ConferenceId, SessionId, PaperId } from '../../domain/value-objects/ConferenceValueObjects';
import { PresentationSession } from '../../domain/entities/PresentationSession';
import { SessionScheduledEvent } from '../../domain/events/ConferenceEvents';

export class SchedulePresentationSessionUseCase {
  constructor(
    private readonly repository: IConferenceRepository,
    private readonly eventPublisher: IConferenceEventPublisher
  ) {}

  async execute(command: SchedulePresentationSessionCommand): Promise<void> {
    const conference = await this.repository.findConferenceById(new ConferenceId(command.conferenceId));
    if (!conference) throw new Error('Conference not found.');

    const sessionId = new SessionId(`SESS-${Date.now()}`);
    const session = new PresentationSession(
      sessionId,
      command.sessionTitle,
      command.startTime,
      command.endTime,
      command.location
    );

    conference.createSession(session);

    for (const pId of command.assignedPaperIds) {
      conference.assignPaperToSession(new PaperId(pId), sessionId);
    }

    await this.repository.saveConference(conference);

    await this.eventPublisher.publish(
      new SessionScheduledEvent(conference.id.getValue(), sessionId.getValue())
    );
  }
}
