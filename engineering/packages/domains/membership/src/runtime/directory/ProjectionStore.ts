import { PublicDirectoryEntryDto, ReviewerDirectoryEntryDto } from '../contracts';

export class ProjectionStore {
  private publicStore = new Map<string, PublicDirectoryEntryDto>();
  private reviewerStore = new Map<string, ReviewerDirectoryEntryDto>();

  async savePublic(entry: PublicDirectoryEntryDto): Promise<void> {
    this.publicStore.set(entry.membershipId, entry);
  }

  async getPublic(membershipId: string): Promise<PublicDirectoryEntryDto | null> {
    return this.publicStore.get(membershipId) || null;
  }

  async saveReviewer(entry: ReviewerDirectoryEntryDto): Promise<void> {
    this.reviewerStore.set(entry.membershipId, entry);
  }

  async getReviewer(membershipId: string): Promise<ReviewerDirectoryEntryDto | null> {
    return this.reviewerStore.get(membershipId) || null;
  }

  async getAllPublic(): Promise<PublicDirectoryEntryDto[]> {
    return Array.from(this.publicStore.values());
  }

  async getAllReviewers(): Promise<ReviewerDirectoryEntryDto[]> {
    return Array.from(this.reviewerStore.values());
  }

  async clear(): Promise<void> {
    this.publicStore.clear();
    this.reviewerStore.clear();
  }
}
