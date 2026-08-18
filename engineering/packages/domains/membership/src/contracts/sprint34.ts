export interface ProjectionMetadata {
  projectionVersion: number;
  schemaVersion: string;
  generatedAt: number;
  generatedFromEventId: string;
  sourceAggregateVersion?: number;
}

export interface PublicDirectoryEntryDto {
  metadata: ProjectionMetadata;
  membershipId: string;
  displayName: string;
  institution: string;
  tier: string;
  isVerified: boolean;
}

export interface ReviewerDirectoryEntryDto {
  metadata: ProjectionMetadata;
  membershipId: string;
  displayName: string;
  institution: string;
  researchAreas: string[];
  academicRole: string;
  tier: string;
  isVerified: boolean;
}

export interface DirectorySearchQuery {
  name?: string;
  institution?: string;
  researchArea?: string;
  tier?: string;
  isVerified?: boolean;
}

export interface IDirectoryQuery {
  // Lookup API
  getPublicProfile(membershipId: string): Promise<PublicDirectoryEntryDto | null>;
  getReviewerProfile(membershipId: string): Promise<ReviewerDirectoryEntryDto | null>;
  
  // Search API
  searchPublicDirectory(query: DirectorySearchQuery): Promise<PublicDirectoryEntryDto[]>;
  searchReviewerDirectory(query: DirectorySearchQuery): Promise<ReviewerDirectoryEntryDto[]>;
}

export interface IDirectoryManagement {
  rebuildIndex(): Promise<void>;
  clearCache(): Promise<void>;
}
