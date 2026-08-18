export interface IMembershipValidationService {
  canReview(memberId: string): Promise<boolean>;
  canEdit(memberId: string): Promise<boolean>;
}
