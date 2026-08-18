export class ConferenceId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class TrackId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class PaperId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class SessionId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class CommitteeId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class PresenterId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class ResearchReference {
  constructor(private readonly projectId: string) {}
  getValue(): string { return this.projectId; }
}

export class ExternalIdentity {
  constructor(
    public readonly name: string,
    public readonly institution: string,
    public readonly email: string,
    public readonly country: string
  ) {}
}
