import { SubmitPaperCommand } from '../commands/ConferenceCommands';
import { IConferenceRepository } from '../ports/IConferenceRepository';
import { IMembershipValidationService } from '../ports/IMembershipValidationService';
import { IConferenceEventPublisher } from '../ports/IConferenceEventPublisher';
import { ConferenceId, PaperId, TrackId, ResearchReference } from '../../domain/value-objects/ConferenceValueObjects';
import { PaperSubmission } from '../../domain/entities/PaperSubmission';
import { PaperSubmittedEvent } from '../../domain/events/ConferenceEvents';

export class SubmitPaperUseCase {
  constructor(
    private readonly repository: IConferenceRepository,
    private readonly membershipValidation: IMembershipValidationService,
    private readonly eventPublisher: IConferenceEventPublisher
  ) {}

  async execute(command: SubmitPaperCommand): Promise<void> {
    const isEligible = await this.membershipValidation.canSubmitPaper(command.authorId);
    if (!isEligible) {
      throw new Error(`Member ${command.authorId} is not eligible to submit papers.`);
    }

    const conference = await this.repository.findConferenceById(new ConferenceId(command.conferenceId));
    if (!conference) throw new Error('Conference not found.');

    const paperId = new PaperId(`PPR-${Date.now()}`);
    const researchRef = command.researchProjectId ? new ResearchReference(command.researchProjectId) : null;

    const paper = new PaperSubmission(
      paperId,
      new TrackId(command.trackId),
      command.authorId,
      command.title,
      command.abstractText,
      researchRef
    );

    conference.submitPaper(paper);

    await this.repository.saveConference(conference);

    await this.eventPublisher.publish(
      new PaperSubmittedEvent(conference.id.getValue(), paper.id.getValue())
    );
  }
}
