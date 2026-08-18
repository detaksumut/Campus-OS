import { ISchemeRuntime, CertificationScheme, SchemeStatus } from '../contracts';
import { IEventBus } from '@campus-os/kernel';

export class SchemeRuntime implements ISchemeRuntime {
  private schemes = new Map<string, CertificationScheme>();

  constructor(private eventBus: IEventBus) {}

  async createScheme(scheme: Omit<CertificationScheme, 'schemeId' | 'createdAt'>): Promise<string> {
    const schemeId = `scheme_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    this.schemes.set(schemeId, { ...scheme, schemeId, createdAt: Date.now() });
    return schemeId;
  }

  async activateScheme(schemeId: string): Promise<void> {
    const s = this.schemes.get(schemeId);
    if (!s) throw new Error('Scheme not found');
    if (s.status === 'Deprecated') throw new Error('Cannot activate a deprecated scheme');
    s.status = 'Active';
    s.activatedAt = Date.now();
    this.eventBus.emit('certification.scheme.activated', { schemeId, name: s.name });
  }

  async deprecateScheme(schemeId: string): Promise<void> {
    const s = this.schemes.get(schemeId);
    if (!s) throw new Error('Scheme not found');
    s.status = 'Deprecated';
    this.eventBus.emit('certification.scheme.deprecated', { schemeId });
  }

  async getScheme(schemeId: string): Promise<CertificationScheme | null> {
    return this.schemes.get(schemeId) || null;
  }

  async getActiveSchemes(): Promise<CertificationScheme[]> {
    return Array.from(this.schemes.values()).filter(s => s.status === 'Active');
  }
}
