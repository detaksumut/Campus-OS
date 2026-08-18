import { EventId } from '../value-objects/CommunityValueObjects';

export class CommunityEvent {
  constructor(
    private readonly eventId: EventId,
    private readonly organizerId: string, // Logical link to MemberId
    private readonly title: string,
    private readonly description: string,
    private readonly scheduleDate: Date
  ) {}

  get id(): EventId { return this.eventId; }
  get organizer(): string { return this.organizerId; }
  get currentTitle(): string { return this.title; }
  get currentDescription(): string { return this.description; }
  get scheduledFor(): Date { return this.scheduleDate; }
}
