export class ProjectProposedEvent {
  constructor(
    public readonly projectId: string,
    public readonly proposalId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class ProjectApprovedEvent {
  constructor(
    public readonly projectId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class MemberAssignedEvent {
  constructor(
    public readonly projectId: string,
    public readonly memberId: string,
    public readonly role: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class MilestoneAchievedEvent {
  constructor(
    public readonly projectId: string,
    public readonly milestoneId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class OutputRegisteredEvent {
  constructor(
    public readonly projectId: string,
    public readonly outputId: string,
    public readonly outputType: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}
