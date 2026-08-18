export interface IMembershipValidationService {
  isMemberValid(memberId: string): Promise<boolean>;
  canServeOnCommittee(memberId: string): Promise<boolean>;
}
