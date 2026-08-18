import { ISubmissionRuntime, SubmissionDto, AuthorReference, IArticleRuntime } from '../contracts';
import { SubmissionPolicy } from '../policies/SubmissionPolicy';

export class SubmissionRuntime implements ISubmissionRuntime {
  private submissions = new Map<string, SubmissionDto>();

  constructor(
    private articleRuntime: IArticleRuntime,
    private policy: SubmissionPolicy
  ) {}

  async createDraft(articleId: string, submitterAuthorId: string, submitterReference: Omit<AuthorReference, 'referenceId' | 'authorId' | 'status'>): Promise<string> {
    const submissionId = `sub_${Date.now()}`;
    const authorRef: AuthorReference = {
      ...submitterReference,
      referenceId: `ref_${Date.now()}`,
      authorId: submitterAuthorId,
      status: 'LINKED' // Automatically linked because they are the submitter
    };

    this.submissions.set(submissionId, {
      submissionId,
      articleId,
      state: 'Draft',
      authors: [authorRef]
    });

    return submissionId;
  }

  async addCoAuthor(submissionId: string, reference: Omit<AuthorReference, 'referenceId' | 'authorId' | 'status'>): Promise<void> {
    const submission = this.submissions.get(submissionId);
    if (!submission) throw new Error('Submission not found');
    
    // Policy check could go here: only allow in Draft/Revision states
    if (submission.state !== 'Draft' && submission.state !== 'Revision') {
       throw new Error('Cannot add authors unless in Draft or Revision state');
    }

    submission.authors.push({
      ...reference,
      referenceId: `ref_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      authorId: null,
      status: 'UNLINKED'
    });
  }

  async claimAuthorship(submissionId: string, referenceId: string, authorId: string): Promise<void> {
    const submission = this.submissions.get(submissionId);
    if (!submission) throw new Error('Submission not found');

    const ref = submission.authors.find(a => a.referenceId === referenceId);
    if (!ref) throw new Error('Author reference not found');
    
    if (ref.status === 'LINKED') throw new Error('Authorship already claimed');

    ref.authorId = authorId;
    ref.status = 'LINKED';
  }

  async submit(submissionId: string): Promise<void> {
    const submission = this.submissions.get(submissionId);
    if (!submission) throw new Error('Submission not found');

    this.policy.validateTransition(submission.state, 'Submitted');
    await this.policy.validateForSubmission(submission, this.articleRuntime);

    submission.state = 'Submitted';
    submission.submittedAt = Date.now();
  }

  async transitionState(submissionId: string, targetState: SubmissionDto['state']): Promise<void> {
    const submission = this.submissions.get(submissionId);
    if (!submission) throw new Error('Submission not found');

    this.policy.validateTransition(submission.state, targetState);
    submission.state = targetState;
  }

  async getSubmission(submissionId: string): Promise<SubmissionDto | null> {
    return this.submissions.get(submissionId) || null;
  }
}
