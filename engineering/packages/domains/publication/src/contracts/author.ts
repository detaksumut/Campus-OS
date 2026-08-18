export type AuthorLifecycleState = 'Created' | 'Active' | 'Inactive' | 'Archived';

export type ReviewerAvailability = 'Available' | 'Busy' | 'Unavailable';

export interface AuthorProfile {
  orcidId?: string;
  preferredCitationName: string;
  correspondingAuthorPreference: boolean;
  preferredReviewLanguage: string[];
}

export interface AuthorDto {
  authorId: string;
  membershipId: string;
  profile: AuthorProfile;
  lifecycleState: AuthorLifecycleState;
  reviewerAvailability: ReviewerAvailability;
  activeAssignmentCount: number;
}

export interface IAuthorRuntime {
  createAuthor(membershipId: string, profile: AuthorProfile): Promise<string>;
  getAuthor(authorId: string): Promise<AuthorDto | null>;
  getAuthorByMembership(membershipId: string): Promise<AuthorDto | null>;
  activate(authorId: string): Promise<void>;
  deactivate(authorId: string): Promise<void>;
  archive(authorId: string): Promise<void>;
  setAvailability(authorId: string, availability: ReviewerAvailability): Promise<void>;
}
