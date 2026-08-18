import { describe, it, expect } from 'vitest';
import { AuthorRuntime } from '../src/runtime/AuthorRuntime';
import { ArticleRuntime } from '../src/runtime/ArticleRuntime';
import { SubmissionRuntime } from '../src/runtime/SubmissionRuntime';
import { SubmissionPolicy } from '../src/policies/SubmissionPolicy';
import { IdentityContext } from '@campus-os/identity/src/contracts';

describe('Publication - Sprint 4.1', () => {
  it('should create an author and process a submission', async () => {
    // Mock Membership SDK Lookup
    const mockMembershipLookup: IMembershipLookup = {
      getMembershipStatus: async (membershipId) => {
        if (membershipId === 'mem_valid') return { status: 'Active', verificationLevel: 'Verified' };
        return { status: 'Inactive', verificationLevel: 'Pending' };
      }
    };

    const authorRuntime = new AuthorRuntime(mockMembershipLookup);
    const articleRuntime = new ArticleRuntime();
    const policy = new SubmissionPolicy();
    const submissionRuntime = new SubmissionRuntime(articleRuntime, policy);

    // 1. Create Author from Membership
    const authorId = await authorRuntime.createAuthor('mem_valid', {
      preferredCitationName: 'John Doe',
      correspondingAuthorPreference: true,
      preferredReviewLanguage: ['en']
    });
    expect(authorId).toBeDefined();

    // 2. Create Article Draft
    const articleId = await articleRuntime.createArticle(
      { title: 'My Paper', abstract: 'This is a long enough abstract for the paper over 50 characters to pass the policy.', keywords: ['AI', 'CS', 'Ethics'], language: 'en', discipline: 'Computer Science' },
      { mainFile: 'paper.pdf', figures: [], tables: [], supplementary: [] }
    );
    expect(articleId).toBeDefined();

    // 3. Create Submission Draft
    const subId = await submissionRuntime.createDraft(articleId, authorId, {
      fullName: 'John Doe', email: 'john@example.com', institution: 'MIT', order: 1, role: 'CORRESPONDING'
    });

    // 4. Add Co-Author as Unlinked
    await submissionRuntime.addCoAuthor(subId, {
      fullName: 'Jane Smith', email: 'jane@example.com', institution: 'MIT', order: 2, role: 'AUTHOR'
    });

    const sub = await submissionRuntime.getSubmission(subId);
    expect(sub?.authors.length).toBe(2);
    expect(sub?.authors[1].status).toBe('UNLINKED');

    // 5. Co-Author Claims Authorship
    const coAuthorId = await authorRuntime.createAuthor('mem_valid', { preferredCitationName: 'Jane Smith', correspondingAuthorPreference: false, preferredReviewLanguage: ['en'] }); // Mocking same membership for simplicity
    await submissionRuntime.claimAuthorship(subId, sub!.authors[1].referenceId, coAuthorId);

    const subAfterClaim = await submissionRuntime.getSubmission(subId);
    expect(subAfterClaim?.authors[1].status).toBe('LINKED');
    expect(subAfterClaim?.authors[1].authorId).toBe(coAuthorId);

    // 6. Submit the Paper
    await submissionRuntime.submit(subId);
    const finalSub = await submissionRuntime.getSubmission(subId);
    expect(finalSub?.state).toBe('Submitted');
  });

  it('should fail submission if policy violated', async () => {
    const articleRuntime = new ArticleRuntime();
    const policy = new SubmissionPolicy();
    const submissionRuntime = new SubmissionRuntime(articleRuntime, policy);

    // Missing Abstract
    const articleId = await articleRuntime.createArticle(
      { title: 'Short Paper', abstract: 'Too short', keywords: [], language: 'en', discipline: 'CS' },
      { mainFile: 'doc.pdf', figures: [], tables: [], supplementary: [] }
    );

    const subId = await submissionRuntime.createDraft(articleId, 'author_1', {
      fullName: 'John', email: 'john@ex.com', institution: 'MIT', order: 1, role: 'CORRESPONDING'
    });

    await expect(submissionRuntime.submit(subId)).rejects.toThrow(/Policy Violation/);
  });
});
