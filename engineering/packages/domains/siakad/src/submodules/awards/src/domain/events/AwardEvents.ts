export class AwardProgramCreatedEvent {
  constructor(
    public readonly awardId: string,
    public readonly name: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class NominationSubmittedEvent {
  constructor(
    public readonly awardId: string,
    public readonly nominationId: string,
    public readonly nomineeId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class EvaluationCompletedEvent {
  constructor(
    public readonly awardId: string,
    public readonly evaluationId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class AwardFinalizedEvent {
  constructor(
    public readonly awardId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class AwardResultsPublishedEvent {
  constructor(
    public readonly awardId: string,
    public readonly winners: string[], // Array of MemberIds
    public readonly occurredOn: Date = new Date()
  ) {}
}
