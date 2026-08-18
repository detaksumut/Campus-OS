export interface IMembershipValidationService {
  canApplyForCertification(memberId: string, programId: string): Promise<boolean>;
  canAssess(memberId: string, programId: string): Promise<boolean>;
}
