import { AssignReviewerCommand } from '../commands/ConferenceCommands';
import { IConferenceRepository } from '../ports/IConferenceRepository';
import { IMembershipValidationService } from '../ports/IMembershipValidationService';
import { ConferenceId, CommitteeId } from '../../domain/value-objects/ConferenceValueObjects';
import { ReviewCommittee } from '../../domain/entities/ReviewCommittee';
import { CommitteeRole } from '../../domain/types/ConferenceEnums';

export class AssignReviewerUseCase {
  constructor(
    private readonly repository: IConferenceRepository,
    private readonly membershipValidation: IMembershipValidationService
  ) {}

  async execute(command: AssignReviewerCommand): Promise<void> {
    const isEligible = await this.membershipValidation.canServeOnCommittee(command.memberId);
    if (!isEligible) throw new Error(`Member ${command.memberId} is not eligible to serve on a conference committee.`);

    const conference = await this.repository.findConferenceById(new ConferenceId(command.conferenceId));
    if (!conference) throw new Error('Conference not found.');

    const committeeId = new CommitteeId(`CMT-${Date.now()}`);
    const member = new ReviewCommittee(committeeId, command.memberId, command.role as CommitteeRole);
    
    conference.addCommitteeMember(member);

    await this.repository.saveConference(conference);
  }
}
