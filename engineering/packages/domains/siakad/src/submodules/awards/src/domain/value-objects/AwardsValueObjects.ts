import { SourceContext } from '../types/AwardsEnums';

export class AwardId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class NominationId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class CommitteeId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class EvaluationId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class EvidenceReference {
  constructor(
    public readonly evidenceType: string,
    public readonly referenceId: string,
    public readonly sourceContext: SourceContext
  ) {}
}
