import { IEventBus } from '@campus-os/kernel';
import { ITierRuntime, MembershipTierDto } from '../contracts';

interface TierDefinition {
  id: string;
  name: string;
  benefits: string[]; // Referencing a Benefit Registry
}

interface TierAssignment {
  membershipId: string;
  tierId: string;
  status: 'Active' | 'Inactive' | 'Expired';
  validFrom: number;
  validUntil: number;
}

export class TierRuntime implements ITierRuntime {
  // Mock Definitions Registry
  private definitions = new Map<string, TierDefinition>([
    ['base', { id: 'base', name: 'Base', benefits: ['cap.base.read'] }],
    ['scholar', { id: 'scholar', name: 'Scholar', benefits: ['cap.scholar.read', 'cap.scholar.write'] }]
  ]);

  private assignments = new Map<string, TierAssignment>();

  constructor(private eventBus: IEventBus) {}

  async assignTier(membershipId: string, tierId: string): Promise<void> {
    if (!this.definitions.has(tierId)) throw new Error('Unknown Tier');
    
    this.assignments.set(membershipId, {
      membershipId,
      tierId,
      status: 'Active',
      validFrom: Date.now(),
      validUntil: Date.now() + 31536000000 // +1 Year
    });
  }

  async revokeTier(membershipId: string): Promise<void> {
    const a = this.assignments.get(membershipId);
    if (a) {
      a.status = 'Inactive';
      this.assignments.set(membershipId, a);
    }
  }

  // SDK Read-Only Projection
  async getTier(membershipId: string): Promise<MembershipTierDto | null> {
    const a = this.assignments.get(membershipId);
    if (!a) return null;
    
    const def = this.definitions.get(a.tierId)!;
    return {
      membershipId,
      tierId: def.id,
      name: def.name,
      status: a.status,
      validFrom: a.validFrom,
      validUntil: a.validUntil,
      benefits: def.benefits
    };
  }
}
