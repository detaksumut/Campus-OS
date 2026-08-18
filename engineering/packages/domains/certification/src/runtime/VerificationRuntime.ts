import { ICertificateRuntime, CertificateRecord } from './CertificateRuntime';

export type VerificationStatus = 'Valid' | 'Expired' | 'Revoked' | 'Unknown';

export interface CertificateVerificationReport {
  certificateNumber: string;
  status: VerificationStatus;
  holder?: {
    holderId: string;
    membershipId: string;
  };
  scheme?: {
    schemeId: string;
  };
  issuedAt?: number;
  expiresAt?: number;
  issuerSignature?: string;
  verificationCode?: string;
  verifiedAt: number;
}

export interface IVerificationRuntime {
  verifyCertificate(certificateNumber: string): Promise<CertificateVerificationReport>;
  verifyMember(membershipId: string): Promise<CertificateRecord[]>;
  verifySignature(certificateId: string, signature: string): Promise<boolean>;
  verifyStatus(certificateId: string): Promise<VerificationStatus>;
}

export class VerificationRuntime implements IVerificationRuntime {
  constructor(private certificateRuntime: ICertificateRuntime) {}

  async verifyCertificate(certificateNumber: string): Promise<CertificateVerificationReport> {
    const cert = await this.certificateRuntime.getByNumber(certificateNumber);
    const verifiedAt = Date.now();

    if (!cert) {
      return { certificateNumber, status: 'Unknown', verifiedAt };
    }

    const status = await this.verifyStatus(cert.certificateId);
    return {
      certificateNumber,
      status,
      holder: { holderId: cert.holderId, membershipId: cert.membershipId },
      scheme: { schemeId: cert.schemeId },
      issuedAt: cert.issueDate,
      expiresAt: cert.expiryDate,
      issuerSignature: cert.signature,
      verificationCode: cert.verificationCode,
      verifiedAt
    };
  }

  async verifyMember(membershipId: string): Promise<CertificateRecord[]> {
    // Returns all active (Issued) certificates for a member
    const all = await this.certificateRuntime.getByHolder(membershipId);
    return all.filter(c => c.state === 'Issued');
  }

  async verifySignature(certificateId: string, signature: string): Promise<boolean> {
    const cert = await this.certificateRuntime.getCertificate(certificateId);
    if (!cert || !cert.signature) return false;
    return cert.signature === signature;
  }

  async verifyStatus(certificateId: string): Promise<VerificationStatus> {
    const cert = await this.certificateRuntime.getCertificate(certificateId);
    if (!cert) return 'Unknown';
    if (cert.state === 'Revoked') return 'Revoked';
    if (cert.state !== 'Issued') return 'Unknown';
    if (cert.expiryDate && Date.now() > cert.expiryDate) return 'Expired';
    return 'Valid';
  }
}
