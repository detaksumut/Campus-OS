import { DiscussionId, ArtifactReference } from '../value-objects/CommunityValueObjects';

export class Discussion {
  constructor(
    private readonly discussionId: DiscussionId,
    private readonly authorId: string, // Logical link to MemberId
    private readonly title: string,
    private readonly content: string,
    private readonly references: ArtifactReference[] = [],
    private readonly isClosed: boolean = false,
    private readonly createdAt: Date = new Date()
  ) {}

  get id(): DiscussionId { return this.discussionId; }
  get author(): string { return this.authorId; }
  get currentTitle(): string { return this.title; }
  get currentContent(): string { return this.content; }
  get allReferences(): ArtifactReference[] { return this.references; }
  get closedStatus(): boolean { return this.isClosed; }
  get dateCreated(): Date { return this.createdAt; }
}
