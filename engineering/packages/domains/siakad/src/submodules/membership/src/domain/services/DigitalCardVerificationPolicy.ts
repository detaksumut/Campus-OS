import { DigitalMemberCard } from '../entities/DigitalMemberCard';

export interface DigitalCardVerificationPolicy {
  generateVerificationToken(cardId: string, memberId: string): Promise<string>;
  verifyToken(token: string, card: DigitalMemberCard): Promise<boolean>;
}
