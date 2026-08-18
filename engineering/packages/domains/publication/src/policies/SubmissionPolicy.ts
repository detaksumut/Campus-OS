import { SubmissionDto, SubmissionState, IArticleRuntime, EditorialPolicy } from '../contracts';

export class SubmissionPolicy {
  private allowedTransitions: Record<SubmissionState, SubmissionState[]> = {
    'Draft':                ['Submitted'],
    'Submitted':            ['Editorial Screening', 'Rejected'],
    'Editorial Screening':  ['Reviewer Assignment', 'Rejected'],
    'Reviewer Assignment':  ['Under Review', 'Rejected'],
    'Under Review':         ['Decision'],
    'Decision':             ['Minor Revision', 'Major Revision', 'Accepted', 'Rejected'],
    'Minor Revision':       ['Submitted'],
    'Major Revision':       ['Submitted'],
    'Accepted':             ['Production'],
    'Production':           ['Published'],
    'Published':            [],
    'Rejected':             []
  };

  constructor(private editorialPolicy: EditorialPolicy) {}

  validateTransition(current: SubmissionState, target: SubmissionState): void {
    const allowed = this.allowedTransitions[current];
    if (!allowed || !allowed.includes(target)) {
      throw new Error(`Invalid state transition: '${current}' → '${target}'`);
    }
  }

  async validateForSubmission(submission: SubmissionDto, articleRuntime: IArticleRuntime): Promise<void> {
    if (submission.authors.length === 0)
      throw new Error('Policy Violation: At least one author is required.');

    const corresponding = submission.authors.filter(a => a.role === 'CORRESPONDING');
    if (corresponding.length !== 1)
      throw new Error('Policy Violation: Exactly one corresponding author is required.');

    const article = await articleRuntime.getArticle(submission.articleId);
    if (!article) throw new Error('Policy Violation: Article not found.');

    if (!article.metadata.abstract || article.metadata.abstract.length < 50)
      throw new Error('Policy Violation: Abstract must be at least 50 characters.');

    if (!article.metadata.keywords || article.metadata.keywords.length < 3)
      throw new Error('Policy Violation: At least 3 keywords are required.');

    if (!article.classification.discipline)
      throw new Error('Policy Violation: Discipline must be specified.');

    if (!article.content.mainFile)
      throw new Error('Policy Violation: Main manuscript file must be attached.');
  }

  canTransitionToUnderReview(submission: SubmissionDto): boolean {
    return submission.acceptedReviewerCount >= this.editorialPolicy.minimumAcceptedReviewers;
  }
}
