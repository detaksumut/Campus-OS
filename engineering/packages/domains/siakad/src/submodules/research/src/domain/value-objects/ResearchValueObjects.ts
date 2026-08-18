export class ProjectId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class ProposalId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class MilestoneId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class OutputId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class MemberId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class PublicationReference {
  constructor(private readonly submissionId: string) {}
  getValue(): string { return this.submissionId; }
}
