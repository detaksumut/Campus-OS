import { CompleteConferenceCommand } from '../commands/ConferenceCommands';
import { IConferenceRepository } from '../ports/IConferenceRepository';
import { ConferenceId } from '../../domain/value-objects/ConferenceValueObjects';
import { ConferenceGovernancePolicy } from '../../domain/services/ConferencePolicies';

export class CompleteConferenceUseCase {
  constructor(
    private readonly repository: IConferenceRepository
  ) {}

  async execute(command: CompleteConferenceCommand): Promise<void> {
    const conference = await this.repository.findConferenceById(new ConferenceId(command.conferenceId));
    if (!conference) throw new Error('Conference not found.');

    if (!ConferenceGovernancePolicy.canCompleteConference(conference)) {
      throw new Error('Cannot complete conference. Ensure it is ONGOING and all sessions have ended.');
    }

    // Direct state mutation typically should reside in the Aggregate Root via a method like `conference.complete()`.
    // Assuming `conference.complete()` is added to ConferenceEvent if we need explicit state transition.
    conference['status'] = 'COMPLETED'; // Pseudo-action based on enum.

    await this.repository.saveConference(conference);
  }
}
