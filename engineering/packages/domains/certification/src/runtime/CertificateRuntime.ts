import { ICertificateNumberGenerator } from '../services/CertificateNumberGenerator';
import { IEventBus } from '@campus-os/kernel';
import { CertificationIntegrationEvents, CertificationDomainEvents } from './CertificationEvents';

export type CertificateState = 'Pending' | 'Generated' | 'Signed' | 'Issued' | 'Revoked';

export interface CertificateRecord {
  certificateId: string;
  certificateNumber: string;
  version: number;           // 1 for first issuance, 2+ for renewals
  previousCertificateId?: string;
  holderId: string;          // applicantId
  membershipId: string;
  schemeId: string;
  decisionId: string;
  state: CertificateState;
  issueDate?: number;
  expiryDate?: number;
  signature?: string;
  verificationCode: string;
  revokedAt?: number;
  revokedReason?: string;
}

export interface ICertificateRuntime {
  initiate(holderId: string, membershipId: string, schemeId: string, decisionId: string, validityMonths: number, previousCertificateId?: string): Promise<string>;
  generate(certificateId: string): Promise<void>;
  sign(certificateId: string, signature: string): Promise<void>;
  issue(certificateId: string): Promise<void>;
  revoke(certificateId: string, reason: string): Promise<void>;
  getCertificate(certificateId: string): Promise<CertificateRecord | null>;
  getByNumber(certificateNumber: string): Promise<CertificateRecord | null>;
  getByHolder(holderId: string): Promise<CertificateRecord[]>;
}

export class CertificateRuntime implements ICertificateRuntime {
  private certificates = new Map<string, CertificateRecord>();
  private byNumber = new Map<string, string>();

  constructor(
    private numberGenerator: ICertificateNumberGenerator,
    private schemeCodeResolver: (schemeId: string) => Promise<string>,
    private eventBus: IEventBus
  ) {}

  async initiate(holderId: string, membershipId: string, schemeId: string, decisionId: string, validityMonths: number, previousCertificateId?: string): Promise<string> {
    const schemeCode = await this.schemeCodeResolver(schemeId);
    const year = new Date().getFullYear();
    const certificateNumber = await this.numberGenerator.generate(schemeCode, year);
    const verificationCode = `VC-${Date.now().toString(36).toUpperCase()}`;
    const certificateId = `cert_${Date.now()}`;

    let version = 1;
    if (previousCertificateId) {
      const prev = await this.getCertificate(previousCertificateId);
      version = (prev?.version ?? 1) + 1;
    }

    this.certificates.set(certificateId, {
      certificateId, certificateNumber, version, previousCertificateId,
      holderId, membershipId, schemeId, decisionId,
      state: 'Pending', verificationCode
    });
    this.byNumber.set(certificateNumber, certificateId);
    return certificateId;
  }

  private getOrThrow(certificateId: string): CertificateRecord {
    const c = this.certificates.get(certificateId);
    if (!c) throw new Error('Certificate not found');
    return c;
  }

  private assertTransition(current: CertificateState, target: CertificateState): void {
    const allowed: Record<CertificateState, CertificateState[]> = {
      'Pending':   ['Generated'],
      'Generated': ['Signed'],
      'Signed':    ['Issued'],
      'Issued':    ['Revoked'],
      'Revoked':   []
    };
    if (!allowed[current].includes(target)) {
      throw new Error(`Invalid certificate transition: '${current}' → '${target}'`);
    }
  }

  async generate(certificateId: string): Promise<void> {
    const c = this.getOrThrow(certificateId);
    this.assertTransition(c.state, 'Generated');
    c.state = 'Generated';
    this.eventBus.emit(CertificationDomainEvents.CertificateGenerated, { certificateId, holderId: c.holderId });
  }

  async sign(certificateId: string, signature: string): Promise<void> {
    const c = this.getOrThrow(certificateId);
    this.assertTransition(c.state, 'Signed');
    c.signature = signature;
    c.state = 'Signed';
    this.eventBus.emit(CertificationDomainEvents.CertificateSigned, { certificateId });
  }

  async issue(certificateId: string): Promise<void> {
    const c = this.getOrThrow(certificateId);
    this.assertTransition(c.state, 'Issued');
    c.state = 'Issued';
    c.issueDate = Date.now();
    this.eventBus.emit(CertificationIntegrationEvents.CertificateIssued, {
      certificateId, certificateNumber: c.certificateNumber,
      holderId: c.holderId, membershipId: c.membershipId,
      schemeId: c.schemeId, issueDate: c.issueDate, expiryDate: c.expiryDate
    });
  }

  async revoke(certificateId: string, reason: string): Promise<void> {
    const c = this.getOrThrow(certificateId);
    this.assertTransition(c.state, 'Revoked');
    c.state = 'Revoked';
    c.revokedAt = Date.now();
    c.revokedReason = reason;
    this.eventBus.emit(CertificationIntegrationEvents.CertificateRevoked, {
      certificateId, certificateNumber: c.certificateNumber, reason
    });
  }

  async getCertificate(certificateId: string): Promise<CertificateRecord | null> {
    return this.certificates.get(certificateId) || null;
  }

  async getByNumber(certificateNumber: string): Promise<CertificateRecord | null> {
    const id = this.byNumber.get(certificateNumber);
    return id ? this.getCertificate(id) : null;
  }

  async getByHolder(holderId: string): Promise<CertificateRecord[]> {
    return Array.from(this.certificates.values()).filter(c => c.holderId === holderId);
  }
}
