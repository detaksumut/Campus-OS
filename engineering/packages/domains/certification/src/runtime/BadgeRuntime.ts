import { ICertificateRuntime, CertificateRecord } from './CertificateRuntime';
import { VerificationRuntime } from './VerificationRuntime';
import { ISchemeRuntime } from '../contracts';

export type BadgeTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
export type BadgeDomain = 'Certification' | 'Awards' | 'Publication' | 'Conference' | 'Community';

export interface BadgeDefinition {
  badgeId: string;
  name: string;
  description: string;
  iconUrl?: string;
  domain: BadgeDomain;
  tier: BadgeTier;
  criteria: string;
}

export interface IssuedBadge {
  issuedBadgeId: string;
  badgeId: string;
  holderId: string;
  membershipId: string;
  sourceId: string;        // e.g. certificateId or awardId
  sourceDomain: BadgeDomain;
  issuedAt: number;
  expiresAt?: number;
}

export interface IBadgeRuntime {
  registerBadgeDefinition(badge: Omit<BadgeDefinition, 'badgeId'>): Promise<string>;
  issueBadge(badgeId: string, holderId: string, membershipId: string, sourceId: string, sourceDomain: BadgeDomain, expiresAt?: number): Promise<string>;
  revokeBadge(issuedBadgeId: string, reason: string): Promise<void>;
  getBadgesForHolder(holderId: string): Promise<IssuedBadge[]>;
  getBadgeDefinition(badgeId: string): Promise<BadgeDefinition | null>;
}

/**
 * BadgeRuntime is domain-agnostic.
 * It can be consumed by Certification (Certified Assessor),
 * Awards (Gold Reviewer), or any other Business Layer domain.
 */
export class BadgeRuntime implements IBadgeRuntime {
  private definitions = new Map<string, BadgeDefinition>();
  private issued = new Map<string, IssuedBadge>();
  private byHolder = new Map<string, Set<string>>();

  async registerBadgeDefinition(badge: Omit<BadgeDefinition, 'badgeId'>): Promise<string> {
    const badgeId = `badge_def_${Date.now()}`;
    this.definitions.set(badgeId, { ...badge, badgeId });
    return badgeId;
  }

  async issueBadge(badgeId: string, holderId: string, membershipId: string, sourceId: string, sourceDomain: BadgeDomain, expiresAt?: number): Promise<string> {
    if (!this.definitions.has(badgeId)) throw new Error('Badge definition not found');
    const issuedBadgeId = `issued_badge_${Date.now()}`;
    const badge: IssuedBadge = { issuedBadgeId, badgeId, holderId, membershipId, sourceId, sourceDomain, issuedAt: Date.now(), expiresAt };
    this.issued.set(issuedBadgeId, badge);
    if (!this.byHolder.has(holderId)) this.byHolder.set(holderId, new Set());
    this.byHolder.get(holderId)!.add(issuedBadgeId);
    return issuedBadgeId;
  }

  async revokeBadge(issuedBadgeId: string, reason: string): Promise<void> {
    if (!this.issued.has(issuedBadgeId)) throw new Error('Issued badge not found');
    this.issued.delete(issuedBadgeId);
  }

  async getBadgesForHolder(holderId: string): Promise<IssuedBadge[]> {
    const ids = this.byHolder.get(holderId) ?? new Set();
    return Array.from(ids).map(id => this.issued.get(id)!).filter(Boolean);
  }

  async getBadgeDefinition(badgeId: string): Promise<BadgeDefinition | null> {
    return this.definitions.get(badgeId) || null;
  }
}
