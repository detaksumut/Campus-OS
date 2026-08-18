export type InvitationStatus = 'Pending' | 'Viewed' | 'Accepted' | 'Declined' | 'Expired';

export interface InvitationDto {
  invitationId: string;
  submissionId: string;
  reviewerId: string;
  roundNumber: number;
  sentAt: number;
  expiresAt: number;
  viewedAt?: number;
  respondedAt?: number;
  status: InvitationStatus;
}

export interface IInvitationRuntime {
  sendInvitation(submissionId: string, reviewerId: string, roundNumber: number, expiryMs: number): Promise<string>;
  view(invitationId: string): Promise<void>;
  accept(invitationId: string): Promise<void>;
  decline(invitationId: string): Promise<void>;
  expireStale(): Promise<void>;
  getInvitation(invitationId: string): Promise<InvitationDto | null>;
  getBySubmission(submissionId: string): Promise<InvitationDto[]>;
}

export type AssignmentLifecycle = 'Assigned' | 'Confirmed' | 'In Progress' | 'Review Submitted' | 'Verified' | 'Completed' | 'Cancelled';

export type ReviewRecommendationType = 'Accept' | 'Minor Revision' | 'Major Revision' | 'Reject';

export interface ReviewRecommendation {
  type: ReviewRecommendationType;
  confidence: 'High' | 'Medium' | 'Low';
  submittedAt: number;
}

export interface AssignmentDto {
  assignmentId: string;
  submissionId: string;
  reviewerId: string;
  invitationId: string;
  roundNumber: number;
  state: AssignmentLifecycle;
  assignedAt: number;
  recommendation?: ReviewRecommendation;
}

export interface IAssignmentRuntime {
  createAssignment(submissionId: string, reviewerId: string, invitationId: string, roundNumber: number): Promise<string>;
  confirm(assignmentId: string): Promise<void>;
  startReview(assignmentId: string): Promise<void>;
  markReviewSubmitted(assignmentId: string): Promise<void>;
  verify(assignmentId: string): Promise<void>;
  complete(assignmentId: string, recommendation: ReviewRecommendation): Promise<void>;
  cancel(assignmentId: string): Promise<void>;
  getBySubmission(submissionId: string): Promise<AssignmentDto[]>;
  getByRound(submissionId: string, roundNumber: number): Promise<AssignmentDto[]>;
}

export type ReviewLifecycle = 'Draft' | 'Submitted' | 'Validated' | 'Locked';

export interface ReviewScores {
  originality: number;      // 1-10
  methodology: number;
  clarity: number;
  significance: number;
}

export interface ReviewForm {
  recommendation: ReviewRecommendation;
  scores: ReviewScores;
  strengths: string;
  weaknesses: string;
  commentsToAuthor: string;
  commentsToEditor: string;
  attachments: string[];
}

export interface ReviewDto {
  reviewId: string;
  assignmentId: string;
  submissionId: string;
  reviewerId: string;
  roundNumber: number;
  state: ReviewLifecycle;
  form?: ReviewForm;
  createdAt: number;
  submittedAt?: number;
  validatedAt?: number;
  lockedAt?: number;
}

export interface IReviewRuntime {
  openReview(assignmentId: string, submissionId: string, reviewerId: string, roundNumber: number): Promise<string>;
  saveDraft(reviewId: string, form: Partial<ReviewForm>): Promise<void>;
  submit(reviewId: string): Promise<void>;
  validate(reviewId: string): Promise<void>;
  lock(reviewId: string): Promise<void>;
  getReview(reviewId: string): Promise<ReviewDto | null>;
  getByAssignment(assignmentId: string): Promise<ReviewDto | null>;
}

export type ReviewRoundLifecycle = 'Open' | 'Collecting Reviews' | 'Closed' | 'Editorial Decision' | 'Completed';
export type RevisionType = 'None' | 'Minor Revision' | 'Major Revision';

export interface SuggestedReviewer {
  reviewerId: string;
  membershipId: string;
  displayName: string;
  previousRound: number;
  isFromPreviousRound: boolean;
}

export interface ReviewRoundDto {
  roundId: string;
  submissionId: string;
  roundNumber: number;
  state: ReviewRoundLifecycle;
  openedAt: number;
  closedAt?: number;
  decisionIssuedAt?: number;
  revisionType: RevisionType;
  suggestedReviewers: SuggestedReviewer[];
  assignmentIds: string[];
  reviewIds: string[];
}

export interface IReviewRoundRuntime {
  openRound(submissionId: string, suggestedReviewers?: SuggestedReviewer[]): Promise<string>;
  addAssignment(roundId: string, assignmentId: string): Promise<void>;
  addReview(roundId: string, reviewId: string): Promise<void>;
  startCollecting(roundId: string): Promise<void>;
  close(roundId: string): Promise<void>;
  recordDecision(roundId: string, revisionType: RevisionType): Promise<void>;
  complete(roundId: string): Promise<void>;
  getRound(roundId: string): Promise<ReviewRoundDto | null>;
  getBySubmission(submissionId: string): Promise<ReviewRoundDto[]>;
}

export type EditorialDecisionType = 'Accept' | 'Minor Revision' | 'Major Revision' | 'Reject';

export interface EditorialDecisionDto {
  decisionId: string;
  submissionId: string;
  roundId: string;
  editorId: string;
  decision: EditorialDecisionType;
  reason: string;
  editorComment: string;
  recommendationSummary: ReviewRecommendationType[];
  issuedAt: number;
}

export interface IEditorialDecisionRuntime {
  issueDecision(
    submissionId: string,
    roundId: string,
    editorId: string,
    decision: EditorialDecisionType,
    reason: string,
    editorComment: string
  ): Promise<string>;
  getDecision(decisionId: string): Promise<EditorialDecisionDto | null>;
  getBySubmission(submissionId: string): Promise<EditorialDecisionDto[]>;
}

export interface ReviewerCandidateDto {
  reviewerId: string;
  membershipId: string;
  displayName: string;
  institution: string;
  researchAreas: string[];
  score: number;
  scoreBreakdown: {
    researchMatch: number;
    expertiseMatch: number;
    tier: number;
    workload: number;
  };
  matchedResearchAreas: string[];
  matchedKeywords: string[];
  explanation: string[];
  conflicts: string[];
  availability: 'Available' | 'Busy' | 'Unavailable';
  isFromPreviousRound: boolean;
}

export interface EditorialPolicy {
  minimumAcceptedReviewers: number;
  maximumAcceptedReviewers: number;
  invitationExpiryMs: number;
  reviewDeadlineMs: number;
  reminderScheduleMs: number[];
  allowEditorOverride: boolean;
}

export interface IReviewerCandidateRuntime {
  findCandidates(submissionId: string, keywords: string[], researchField: string, previousRoundReviewerIds?: string[]): Promise<ReviewerCandidateDto[]>;
}
