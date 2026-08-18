import { PaperId, SessionId } from '../value-objects/ConferenceValueObjects';

export class PresentationAssignment {
  constructor(
    private readonly paperId: PaperId,
    private readonly sessionId: SessionId
  ) {}

  get paper(): PaperId { return this.paperId; }
  get session(): SessionId { return this.sessionId; }
}
