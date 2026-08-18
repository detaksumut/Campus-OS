import { DigitalCardVerificationPolicy } from '../domain/services/DigitalCardVerificationPolicy';
import { DigitalMemberCard } from '../domain/entities/DigitalMemberCard';
import * as crypto from 'crypto';

export class DigitalCardVerificationPolicyImpl implements DigitalCardVerificationPolicy {
  private readonly SECRET_KEY = process.env.CARD_SECRET_KEY || 'default-secret-key';

  async generateVerificationToken(cardId: string, memberId: string): Promise<string> {
    const payload = `${cardId}:${memberId}:${Date.now()}`;
    return crypto.createHmac('sha256', this.SECRET_KEY).update(payload).digest('hex');
  }

  async verifyToken(token: string, card: DigitalMemberCard): Promise<boolean> {
    // In a real implementation, you might verify the token structure.
    // For now, we simply check if the token matches the card's recorded token.
    return token === card.token;
  }
}
