export interface IMembershipValidationService {
  isMemberValid(memberId: string): Promise<boolean>;
}
