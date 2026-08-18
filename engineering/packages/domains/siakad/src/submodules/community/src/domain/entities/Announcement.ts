import { AnnouncementId } from '../value-objects/CommunityValueObjects';

export class Announcement {
  constructor(
    private readonly announcementId: AnnouncementId,
    private readonly authorId: string, // Logical link to MemberId (Must be Admin/Owner)
    private readonly title: string,
    private readonly content: string,
    private readonly publishedAt: Date = new Date()
  ) {}

  get id(): AnnouncementId { return this.announcementId; }
  get author(): string { return this.authorId; }
  get currentTitle(): string { return this.title; }
  get currentContent(): string { return this.content; }
  get datePublished(): Date { return this.publishedAt; }
}
