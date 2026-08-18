import { IAuthorRuntime, AuthorProfile, AuthorDto } from '../contracts';
// Assuming IdentityContext is imported from the @campus-os/identity SDK via DI
import { IdentityContext } from '@campus-os/identity/src/contracts';

export class AuthorRuntime implements IAuthorRuntime {
  private authors = new Map<string, AuthorDto>();
  private membershipToAuthor = new Map<string, string>(); // membershipId -> authorId

  constructor(private membershipLookup: IMembershipLookup) {}

  async createAuthor(membershipId: string, profile: AuthorProfile): Promise<string> {
    // Policy Check: Must be a valid membership
    const membershipStatus = await this.membershipLookup.getMembershipStatus(membershipId);
    if (!membershipStatus || membershipStatus.status !== 'Active') {
      throw new Error('Author Creation Policy Violation: Membership is not active.');
    }

    if (this.membershipToAuthor.has(membershipId)) {
      throw new Error('Author already exists for this membership.');
    }

    const authorId = `auth_${Date.now()}`;
    const author: AuthorDto = {
      authorId,
      membershipId,
      profile
    };

    this.authors.set(authorId, author);
    this.membershipToAuthor.set(membershipId, authorId);
    
    return authorId;
  }

  async getAuthor(authorId: string): Promise<AuthorDto | null> {
    return this.authors.get(authorId) || null;
  }

  async getAuthorByMembership(membershipId: string): Promise<AuthorDto | null> {
    const authorId = this.membershipToAuthor.get(membershipId);
    if (!authorId) return null;
    return this.getAuthor(authorId);
  }
}
