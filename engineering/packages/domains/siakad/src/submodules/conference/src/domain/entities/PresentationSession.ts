import { SessionId, PresenterId } from '../value-objects/ConferenceValueObjects';

export class PresentationSession {
  private assignedPresenterIds: PresenterId[] = [];

  constructor(
    private readonly sessionId: SessionId,
    private title: string,
    private startTime: Date,
    private endTime: Date,
    private location: string // Physical room or URL
  ) {}

  get id(): SessionId { return this.sessionId; }
  get currentTitle(): string { return this.title; }
  get scheduleStart(): Date { return this.startTime; }
  get scheduleEnd(): Date { return this.endTime; }
  get sessionLocation(): string { return this.location; }
  get presenters(): PresenterId[] { return this.assignedPresenterIds; }

  assignPresenter(presenterId: PresenterId): void {
    if (this.assignedPresenterIds.some(p => p.getValue() === presenterId.getValue())) {
      throw new Error('Presenter is already assigned to this session.');
    }
    this.assignedPresenterIds.push(presenterId);
  }
}
