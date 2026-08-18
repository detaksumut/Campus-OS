export class ManuscriptSubmittedEvent {
  constructor(
    public readonly submissionId: string,
    public readonly authorId: string,
    public readonly version: number,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class ReviewerAssignedEvent {
  constructor(
    public readonly submissionId: string,
    public readonly reviewerId: string,
    public readonly round: number,
    public readonly deadline: Date,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class ReviewCompletedEvent {
  constructor(
    public readonly submissionId: string,
    public readonly assignmentId: string,
    public readonly decision: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class EditorialDecisionMadeEvent {
  constructor(
    public readonly submissionId: string,
    public readonly decision: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class ArticlePublishedEvent {
  constructor(
    public readonly submissionId: string,
    public readonly publishedAt: Date = new Date()
  ) {}
}
