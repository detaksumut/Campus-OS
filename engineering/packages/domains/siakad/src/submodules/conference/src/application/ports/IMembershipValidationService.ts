export interface IMembershipValidationService {
  canServeOnCommittee(memberId: string): Promise<boolean>;
  canSubmitPaper(memberId: string): Promise<boolean>;
}
