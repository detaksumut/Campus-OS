export class GetSubmissionDetailsQuery {
  constructor(public readonly submissionId: string) {}
}

export class ListPendingReviewsQuery {
  constructor(public readonly reviewerId: string) {}
}

export interface SubmissionDetailsDto {
  submissionId: string;
  authorId: string;
  status: string;
  title: string;
  abstract: string;
}

export interface PendingReviewDto {
  submissionId: string;
  assignmentId: string;
  title: string;
  deadline: string;
}
