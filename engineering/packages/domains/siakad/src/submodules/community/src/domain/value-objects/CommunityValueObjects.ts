import { ArtifactContext } from '../types/CommunityEnums';

export class CommunityId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class DiscussionId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class EventId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class AnnouncementId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class RequestId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class ArtifactReference {
  constructor(
    public readonly referenceId: string,
    public readonly context: ArtifactContext
  ) {}
}
