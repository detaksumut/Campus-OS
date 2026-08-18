export class ConferenceCreatedEvent {
  constructor(
    public readonly conferenceId: string,
    public readonly name: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class PaperSubmittedEvent {
  constructor(
    public readonly conferenceId: string,
    public readonly paperId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class PaperAcceptedEvent {
  constructor(
    public readonly conferenceId: string,
    public readonly paperId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class PaperEligibleForJournalEvent {
  constructor(
    public readonly conferenceId: string,
    public readonly paperId: string,
    public readonly authorId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class SessionScheduledEvent {
  constructor(
    public readonly conferenceId: string,
    public readonly sessionId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}
