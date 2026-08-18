export type SubmissionState =
  | 'Draft'
  | 'Submitted'
  | 'Editorial Screening'
  | 'Reviewer Assignment'
  | 'Under Review'
  | 'Decision'
  | 'Minor Revision'
  | 'Major Revision'
  | 'Accepted'
  | 'Production'
  | 'Published'
  | 'Rejected';

export type AuthorReferenceRole = 'CORRESPONDING' | 'AUTHOR';
export type AuthorReferenceStatus = 'UNLINKED' | 'LINKED';

export interface AuthorReference {
  referenceId: string;
  authorId: string | null;
  fullName: string;
  email: string;
  institution: string;
  orcid?: string;
  order: number;
  role: AuthorReferenceRole;
  status: AuthorReferenceStatus;
}

export interface SubmissionDto {
  submissionId: string;
  articleId: string;
  state: SubmissionState;
  authors: AuthorReference[];
  submittedAt?: number;
  acceptedReviewerCount: number;
}

export interface ISubmissionRuntime {
  createDraft(articleId: string, submitterAuthorId: string, submitterReference: Omit<AuthorReference, 'referenceId' | 'authorId' | 'status'>): Promise<string>;
  addCoAuthor(submissionId: string, reference: Omit<AuthorReference, 'referenceId' | 'authorId' | 'status'>): Promise<void>;
  claimAuthorship(submissionId: string, referenceId: string, authorId: string): Promise<void>;
  submit(submissionId: string): Promise<void>;
  recordReviewerAcceptance(submissionId: string): Promise<void>;
  getSubmission(submissionId: string): Promise<SubmissionDto | null>;
}
