export interface ApplicantSummaryViewModel {
  readonly applicantId: string;
  readonly fullName: string;
  readonly status: string;
  readonly submissionDate?: Date;
}

export interface ApplicantDetailViewModel {
  readonly applicantId: string;
  readonly fullName: string;
  readonly dateOfBirth: string;
  readonly status: string;
  readonly verifiedDocumentsCount: number;
  readonly missingDocuments: string[];
}
