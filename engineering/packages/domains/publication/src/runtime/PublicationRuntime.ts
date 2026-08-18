import { IPublicationRuntime, PublicationRecord, PublicationLifecycle } from '../contracts';
import { IEventBus } from '@campus-os/kernel';

export class PublicationRuntime implements IPublicationRuntime {
  private records = new Map<string, PublicationRecord>();

  private transitions: Record<PublicationLifecycle, PublicationLifecycle[]> = {
    'Scheduled':      ['Online First'],
    'Online First':   ['Issue Published'],
    'Issue Published':['Archived'],
    'Archived':       []
  };

  constructor(private eventBus: IEventBus) {}

  async createScheduled(submissionId: string, articleId: string): Promise<string> {
    const publicationId = `pub_${Date.now()}`;
    this.records.set(publicationId, {
      publicationId, submissionId, articleId,
      state: 'Scheduled', scheduledAt: Date.now()
    });
    return publicationId;
  }

  private getOrThrow(publicationId: string): PublicationRecord {
    const r = this.records.get(publicationId);
    if (!r) throw new Error('Publication record not found');
    return r;
  }

  private transition(record: PublicationRecord, target: PublicationLifecycle): void {
    if (!this.transitions[record.state].includes(target)) {
      throw new Error(`Invalid publication transition: '${record.state}' → '${target}'`);
    }
    record.state = target;
  }

  async publishOnlineFirst(publicationId: string): Promise<void> {
    const r = this.getOrThrow(publicationId);
    this.transition(r, 'Online First');
    r.onlineFirstAt = Date.now();
    this.eventBus.emit('publication.article.online-first', { publicationId, articleId: r.articleId });
  }

  async publishInIssue(publicationId: string, issueId: string, volume: number, issue: number, startPage: number, endPage: number): Promise<void> {
    const r = this.getOrThrow(publicationId);
    this.transition(r, 'Issue Published');
    r.issueId = issueId;
    r.volume = volume;
    r.issue = issue;
    r.startPage = startPage;
    r.endPage = endPage;
    r.publishedAt = Date.now();
    this.eventBus.emit('publication.article.published', { publicationId, articleId: r.articleId, doi: r.doiId, issueId, volume, issue });
  }

  async archive(publicationId: string): Promise<void> {
    const r = this.getOrThrow(publicationId);
    this.transition(r, 'Archived');
    r.archivedAt = Date.now();
  }

  async getRecord(publicationId: string): Promise<PublicationRecord | null> {
    return this.records.get(publicationId) || null;
  }
}
