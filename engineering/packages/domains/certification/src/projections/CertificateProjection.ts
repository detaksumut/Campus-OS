import { ICertificateRuntime, CertificateRecord } from '../runtime/CertificateRuntime';
import { VerificationRuntime, VerificationStatus } from '../runtime/VerificationRuntime';
import { ISchemeRuntime } from '../contracts';
import { IBadgeRuntime, IssuedBadge } from '../runtime/BadgeRuntime';

export interface CertificateProjectionDto {
  certificateId: string;
  certificateNumber: string;
  version: number;
  holder: {
    holderId: string;
    membershipId: string;
  };
  scheme: {
    schemeId: string;
    schemeName: string;
  };
  status: VerificationStatus;
  issuedAt: number | undefined;
  expiresAt: number | undefined;
  verificationUrl: string;
  qrCodeData: string;
  verificationCode: string;
  badges: IssuedBadge[];
  metadata: {
    projectionVersion: string;
    generatedAt: number;
  };
}

export class CertificateProjection {
  constructor(
    private certificateRuntime: ICertificateRuntime,
    private verificationRuntime: VerificationRuntime,
    private schemeRuntime: ISchemeRuntime,
    private badgeRuntime: IBadgeRuntime,
    private baseVerificationUrl: string = 'https://verify.campus-os.ac.id'
  ) {}

  async project(certificateId: string): Promise<CertificateProjectionDto | null> {
    const cert = await this.certificateRuntime.getCertificate(certificateId);
    if (!cert) return null;

    const [status, scheme, badges] = await Promise.all([
      this.verificationRuntime.verifyStatus(certificateId),
      this.schemeRuntime.getScheme(cert.schemeId),
      this.badgeRuntime.getBadgesForHolder(cert.holderId)
    ]);

    const verificationUrl = `${this.baseVerificationUrl}/cert/${cert.certificateNumber}`;

    // QR code data encodes both the URL and verification code for offline use
    const qrCodeData = JSON.stringify({
      url: verificationUrl,
      certNumber: cert.certificateNumber,
      verificationCode: cert.verificationCode,
      schemeId: cert.schemeId
    });

    return {
      certificateId: cert.certificateId,
      certificateNumber: cert.certificateNumber,
      version: cert.version,
      holder: { holderId: cert.holderId, membershipId: cert.membershipId },
      scheme: { schemeId: cert.schemeId, schemeName: scheme?.name ?? 'Unknown' },
      status,
      issuedAt: cert.issueDate,
      expiresAt: cert.expiryDate,
      verificationUrl,
      qrCodeData,
      verificationCode: cert.verificationCode,
      badges: badges.filter(b => b.sourceId === certificateId),
      metadata: { projectionVersion: '1.0', generatedAt: Date.now() }
    };
  }

  async projectByHolder(holderId: string): Promise<CertificateProjectionDto[]> {
    const certs = await this.certificateRuntime.getByHolder(holderId);
    const results = await Promise.all(certs.map(c => this.project(c.certificateId)));
    return results.filter((r): r is CertificateProjectionDto => r !== null);
  }
}
