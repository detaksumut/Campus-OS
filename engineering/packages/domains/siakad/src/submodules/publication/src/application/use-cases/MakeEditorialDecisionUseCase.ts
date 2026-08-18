import { MakeEditorialDecisionCommand } from '../commands/PublicationCommands';
import { IPublicationRepository } from '../ports/IPublicationRepository';
import { IMembershipValidationService } from '../ports/IMembershipValidationService';
import { IPublicationEventPublisher } from '../ports/IPublicationEventPublisher';
import { SubmissionId, EditorId } from '../../domain/value-objects/PublicationValueObjects';
import { ReviewDecision } from '../../domain/types/PublicationEnums';
import { EditorialDecisionMadeEvent } from '../../domain/events/PublicationEvents';

export class MakeEditorialDecisionUseCase {
  constructor(
    private readonly repository: IPublicationRepository,
    private readonly membershipValidation: IMembershipValidationService,
    private readonly eventPublisher: IPublicationEventPublisher
  ) {}

  async execute(command: MakeEditorialDecisionCommand): Promise<void> {
    const canEdit = await this.membershipValidation.canEdit(command.editorId);
    if (!canEdit) throw new Error('Member is not an eligible Editor.');

    const submission = await this.repository.findSubmissionById(new SubmissionId(command.submissionId));
    if (!submission) throw new Error('Submission not found.');

    submission.makeEditorialDecision(
      new EditorId(command.editorId),
      command.decision as ReviewDecision,
      command.justification
    );

    await this.repository.saveSubmission(submission);

    await this.eventPublisher.publish(
      new EditorialDecisionMadeEvent(submission.id.getValue(), command.decision)
    );
  }
}
