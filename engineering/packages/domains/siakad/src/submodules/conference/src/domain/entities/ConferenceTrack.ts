import { TrackId } from '../value-objects/ConferenceValueObjects';

export class ConferenceTrack {
  constructor(
    private readonly trackId: TrackId,
    private name: string,
    private description: string
  ) {}

  get id(): TrackId { return this.trackId; }
  get currentName(): string { return this.name; }
  get currentDescription(): string { return this.description; }
}
