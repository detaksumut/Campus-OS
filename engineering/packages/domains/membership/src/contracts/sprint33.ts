// DTO Projections (Returned by SDK)
export interface MembershipTierDto {
  membershipId: string;
  tierId: string;
  name: string;
  status: 'Active' | 'Inactive' | 'Expired';
  validFrom: number;
  validUntil: number;
  benefits: string[];
}

export interface DigitalCardDto {
  cardId: string;
  membershipId: string;
  displayName: string;
  template: string; // 'Standard' | 'Professional' | etc
  tierName: string;
  status: string;
  verificationLevel: string;
  qrPayload: string; // URL or CardID
}

// -----------------------------------------
// Read-Only SDK Interfaces (For Cross-Domain)
// -----------------------------------------
export interface IMembershipTierLookup {
  getTier(membershipId: string): Promise<MembershipTierDto | null>;
}

export interface IMembershipCardLookup {
  getCard(membershipId: string): Promise<DigitalCardDto | null>;
}

// -----------------------------------------
// Runtimes
// -----------------------------------------
export interface ITierRuntime extends IMembershipTierLookup {
  assignTier(membershipId: string, tierId: string): Promise<void>;
  revokeTier(membershipId: string): Promise<void>;
}

export interface IDigitalCardRuntime extends IMembershipCardLookup {
  generateCard(membershipId: string, templateId: string): Promise<DigitalCardDto>;
}
