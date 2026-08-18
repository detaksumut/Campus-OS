import { IDigitalCardRuntime, DigitalCardDto, IProfileRuntime, IVerificationRuntime, ITierRuntime } from '../contracts';

interface CardTemplate {
  id: string;
  name: string;
  layout: string;
  branding: string;
  qrPolicy: 'VerificationURL' | 'CardID';
}

export class DigitalCardRuntime implements IDigitalCardRuntime {
  private templates = new Map<string, CardTemplate>([
    ['Standard', { id: 'Standard', name: 'Standard', layout: 'BasicLayout', branding: 'Blue', qrPolicy: 'VerificationURL' }],
    ['Scholar', { id: 'Scholar', name: 'Scholar', layout: 'PremiumLayout', branding: 'Gold', qrPolicy: 'VerificationURL' }]
  ]);

  constructor(
    private profileRuntime: IProfileRuntime,
    private verificationRuntime: IVerificationRuntime,
    private tierRuntime: ITierRuntime
  ) {}

  async generateCard(membershipId: string, templateId: string): Promise<DigitalCardDto> {
    const template = this.templates.get(templateId);
    if (!template) throw new Error('Template not found');

    const profile = await this.profileRuntime.getPublicProfile(membershipId);
    const tier = await this.tierRuntime.getTier(membershipId);
    const verification = await this.verificationRuntime.getVerificationState(membershipId);

    if (!profile) throw new Error('Profile not found');

    const cardId = `card_${membershipId}`;
    const qrPayload = template.qrPolicy === 'CardID' ? cardId : `https://verify.campus.os/${cardId}`;

    return {
      cardId,
      membershipId,
      displayName: profile.displayName,
      template: template.name,
      tierName: tier?.name || 'Unknown',
      status: tier?.status || 'Inactive',
      verificationLevel: verification,
      qrPayload
    };
  }

  // SDK Lookup
  async getCard(membershipId: string): Promise<DigitalCardDto | null> {
    // In reality, this might return a cached DTO, but we dynamically generate for now
    return this.generateCard(membershipId, 'Standard').catch(() => null);
  }
}
