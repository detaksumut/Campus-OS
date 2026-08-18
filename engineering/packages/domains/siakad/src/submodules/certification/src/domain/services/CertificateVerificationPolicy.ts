import { Certificate } from '../entities/Certificate';
import { CertificateStatus } from '../types/CertificationEnums';

export class CertificateVerificationPolicy {
  /**
   * Verifies the authenticity and validity of a certificate.
   */
  static verify(certificate: Certificate, hashToVerify: string): boolean {
    if (certificate.currentStatus === CertificateStatus.REVOKED) {
      return false; // Revoked certificates are invalid
    }

    if (certificate.currentStatus === CertificateStatus.EXPIRED || 
       (certificate['expirationDate'] && certificate['expirationDate'].getTime() < Date.now())) {
      return false; // Expired certificates are invalid
    }

    if (certificate.hash !== hashToVerify) {
      return false; // Hash mismatch indicates tampering
    }

    return true; // Authentic and active
  }
}
