import { PublicDirectoryEntryDto, ReviewerDirectoryEntryDto, DirectorySearchQuery } from '../../contracts';

export class SearchIndex {
  // In-memory inverted index mocks
  
  async searchPublic(dataset: PublicDirectoryEntryDto[], query: DirectorySearchQuery): Promise<PublicDirectoryEntryDto[]> {
    return dataset.filter(d => {
      if (query.name && !d.displayName.includes(query.name)) return false;
      if (query.institution && d.institution !== query.institution) return false;
      if (query.tier && d.tier !== query.tier) return false;
      if (query.isVerified !== undefined && d.isVerified !== query.isVerified) return false;
      return true;
    });
  }

  async searchReviewer(dataset: ReviewerDirectoryEntryDto[], query: DirectorySearchQuery): Promise<ReviewerDirectoryEntryDto[]> {
    return dataset.filter(d => {
      if (query.name && !d.displayName.includes(query.name)) return false;
      if (query.institution && d.institution !== query.institution) return false;
      if (query.tier && d.tier !== query.tier) return false;
      if (query.isVerified !== undefined && d.isVerified !== query.isVerified) return false;
      if (query.researchArea && !d.researchAreas.includes(query.researchArea)) return false;
      return true;
    });
  }

  async rebuild(): Promise<void> {
    // Reindex logic
  }
}
