export interface IMembershipValidationService {
  canLeadResearch(memberId: string): Promise<boolean>;
  canParticipateInResearch(memberId: string): Promise<boolean>;
}
