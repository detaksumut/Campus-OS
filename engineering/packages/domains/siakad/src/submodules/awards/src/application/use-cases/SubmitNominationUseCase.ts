import { SubmitNominationCommand } from '../commands/AwardsCommands';
import { IAwardsRepository } from '../ports/IAwardsRepository';
import { IMembershipValidationService } from '../ports/IMembershipValidationService';
import { IAwardsEventPublisher } from '../ports/IAwardsEventPublisher';
import { AwardId, NominationId, EvidenceReference } from '../../domain/value-objects/AwardsValueObjects';
import { AwardNomination } from '../../domain/entities/AwardNomination';
import { AwardEligibilityPolicy } from '../../domain/services/AwardPolicies';
import { SourceContext } from '../../domain/types/AwardsEnums';
import { NominationSubmittedEvent } from '../../domain/events/AwardEvents';

export class SubmitNominationUseCase {
  constructor(
    private readonly repository: IAwardsRepository,
    private readonly membershipValidation: IMembershipValidationService,
    private readonly eventPublisher: IAwardsEventPublisher
  ) {}

  async execute(command: SubmitNominationCommand): Promise<void> {
    // Validate members
    const isNominatorValid = await this.membershipValidation.isMemberValid(command.nominatorId);
    const isNomineeValid = await this.membershipValidation.isMemberValid(command.nomineeId);
    
    if (!isNominatorValid || !isNomineeValid) {
      throw new Error('Nominator or Nominee is not a valid recognized member.');
    }

    const program = await this.repository.findAwardProgramById(new AwardId(command.awardId));
    if (!program) throw new Error('Award Program not found.');

    if (!AwardEligibilityPolicy.isNominationEligible(program, command.nominatorId, command.nomineeId)) {
      throw new Error('Nomination is not eligible. Check self-nomination rules or duplicates.');
    }

    const nominationId = new NominationId(`NOM-${Date.now()}`);
    
    const evidenceList = command.evidence.map(e => new EvidenceReference(
      e.evidenceType,
      e.referenceId,
      e.sourceContext as SourceContext
    ));

    const nomination = new AwardNomination(
      nominationId,
      command.nomineeId,
      command.nominatorId,
      evidenceList
    );

    program.submitNomination(nomination);

    await this.repository.saveAwardProgram(program);

    await this.eventPublisher.publish(
      new NominationSubmittedEvent(program.id.getValue(), nominationId.getValue(), command.nomineeId)
    );
  }
}
