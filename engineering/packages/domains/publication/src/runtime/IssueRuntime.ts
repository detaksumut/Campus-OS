import { IIssueRuntime, IssueDto, IssueArticleRef } from '../contracts';
import { IEventBus } from '@campus-os/kernel';

export class IssueRuntime implements IIssueRuntime {
  private issues = new Map<string, IssueDto>();

  constructor(private eventBus: IEventBus) {}

  async createIssue(journalId: string, volume: number, issue: number, year: number, title?: string): Promise<string> {
    const issueId = `issue_${journalId}_v${volume}i${issue}`;
    this.issues.set(issueId, {
      issueId, journalId, volume, issue, year, title,
      status: 'Draft', publications: [], openedAt: Date.now()
    });
    return issueId;
  }

  async openIssue(issueId: string): Promise<void> {
    const i = this.issues.get(issueId);
    if (!i) throw new Error('Issue not found');
    i.status = 'Open';
  }

  async addPublication(issueId: string, ref: IssueArticleRef): Promise<void> {
    const i = this.issues.get(issueId);
    if (!i) throw new Error('Issue not found');
    if (i.status === 'Published') throw new Error('Cannot add to a published issue');
    i.publications.push(ref);
  }

  async closeIssue(issueId: string): Promise<void> {
    const i = this.issues.get(issueId);
    if (!i) throw new Error('Issue not found');
    if (i.publications.length === 0) throw new Error('Issue must have at least one publication');
    i.status = 'Closed';
  }

  async publishIssue(issueId: string): Promise<void> {
    const i = this.issues.get(issueId);
    if (!i) throw new Error('Issue not found');
    if (i.status !== 'Closed') throw new Error('Issue must be Closed before publishing');
    i.status = 'Published';
    i.publishedAt = Date.now();
    this.eventBus.emit('publication.issue.published', { issueId, volume: i.volume, issue: i.issue, year: i.year });
  }

  async getIssue(issueId: string): Promise<IssueDto | null> {
    return this.issues.get(issueId) || null;
  }
}
