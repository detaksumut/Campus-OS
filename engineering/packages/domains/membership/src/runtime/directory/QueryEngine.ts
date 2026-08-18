import { IDirectoryQuery, PublicDirectoryEntryDto, ReviewerDirectoryEntryDto, DirectorySearchQuery } from '../../contracts';
import { ProjectionStore } from './ProjectionStore';
import { SearchIndex } from './SearchIndex';

export class QueryEngine implements IDirectoryQuery {
  constructor(
    private store: ProjectionStore,
    private index: SearchIndex
  ) {}

  async getPublicProfile(membershipId: string): Promise<PublicDirectoryEntryDto | null> {
    return this.store.getPublic(membershipId);
  }

  async getReviewerProfile(membershipId: string): Promise<ReviewerDirectoryEntryDto | null> {
    return this.store.getReviewer(membershipId);
  }

  async searchPublicDirectory(query: DirectorySearchQuery): Promise<PublicDirectoryEntryDto[]> {
    const dataset = await this.store.getAllPublic();
    return this.index.searchPublic(dataset, query);
  }

  async searchReviewerDirectory(query: DirectorySearchQuery): Promise<ReviewerDirectoryEntryDto[]> {
    const dataset = await this.store.getAllReviewers();
    return this.index.searchReviewer(dataset, query);
  }
}
