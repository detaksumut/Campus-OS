import { IRuntime } from '@campus-os/kernel';
import { AuthorRuntime } from './AuthorRuntime';
import { ArticleRuntime } from './ArticleRuntime';
import { SubmissionRuntime } from './SubmissionRuntime';
import { SubmissionPolicy } from '../policies/SubmissionPolicy';
import { IdentityContext } from '@campus-os/identity/src/contracts';

export class PublicationRuntimeModule implements IRuntime {
  readonly name = 'PublicationBoundedContext';

  public author: AuthorRuntime;
  public article: ArticleRuntime;
  public submission: SubmissionRuntime;
  private submissionPolicy: SubmissionPolicy;

  constructor(membershipLookup: IMembershipLookup) {
    this.author = new AuthorRuntime(membershipLookup);
    this.article = new ArticleRuntime();
    this.submissionPolicy = new SubmissionPolicy();
    this.submission = new SubmissionRuntime(this.article, this.submissionPolicy);
  }

  async initialize() {}
  async shutdown() {}
}
