import { RecordReviewDecisionCommand } from '../commands/ConferenceCommands';
import { IConferenceRepository } from '../ports/IConferenceRepository';
import { IConferenceEventPublisher } from '../ports/IConferenceEventPublisher';
import { ConferenceId, PaperId } from '../../domain/value-objects/ConferenceValueObjects';
import { PaperAcceptedEvent, PaperEligibleForJournalEvent } from '../../domain/events/ConferenceEvents';

export class RecordReviewDecisionUseCase {
  constructor(
    private readonly repository: IConferenceRepository,
    private readonly eventPublisher: IConferenceEventPublisher
  ) {}

  async execute(command: RecordReviewDecisionCommand): Promise<void> {
    const conference = await this.repository.findConferenceById(new ConferenceId(command.conferenceId));
    if (!conference) throw new Error('Conference not found.');

    const paper = conference.allPapers.find(p => p.id.getValue() === command.paperId);
    if (!paper) throw new Error('Paper not found in this conference.');

    if (command.decision === 'ACCEPT') {
      paper.accept();
      
      await this.repository.saveConference(conference);

      // Fire accepted event
      await this.eventPublisher.publish(
        new PaperAcceptedEvent(conference.id.getValue(), paper.id.getValue())
      );

      // Fire eligible for journal event so Publication can pick it up
      await this.eventPublisher.publish(
        new PaperEligibleForJournalEvent(conference.id.getValue(), paper.id.getValue(), paper.author)
      );

    } else if (command.decision === 'REJECT') {
      paper.reject();
      await this.repository.saveConference(conference);
    } else {
      throw new Error('Invalid decision.');
    }
  }
}
