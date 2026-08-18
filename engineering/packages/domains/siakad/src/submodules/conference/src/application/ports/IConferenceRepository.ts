import { ConferenceEvent } from '../../domain/entities/ConferenceEvent';
import { ConferenceId } from '../../domain/value-objects/ConferenceValueObjects';

export interface IConferenceRepository {
  saveConference(conference: ConferenceEvent): Promise<void>;
  findConferenceById(id: ConferenceId): Promise<ConferenceEvent | null>;
}
