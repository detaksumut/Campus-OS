import * as crypto from 'crypto';

export interface CertificateMetadata {
  type: 'Architecture' | 'Backend' | 'Presentation' | 'Integration' | 'Platform';
  version: string;
  hash: string;
  content: string; // Serialized string of the cert content
}

export interface ChainValidationResult {
  isValid: boolean;
  brokenLinks: string[];
  versionMismatches: string[];
}

export class EnterpriseChainValidator {
  static validate(chain: CertificateMetadata[], targetGovernanceVersion: string): ChainValidationResult {
    const brokenLinks: string[] = [];
    const versionMismatches: string[] = [];

    // Order matters: Architecture ➔ Backend ➔ Presentation ➔ Integration ➔ Platform
    const expectedOrder = ['Architecture', 'Backend', 'Presentation', 'Integration', 'Platform'];
    
    for (let i = 0; i < chain.length; i++) {
      const cert = chain[i];
      if (cert.type !== expectedOrder[i]) {
        brokenLinks.push(`Out of order certificate: expected ${expectedOrder[i]}, got ${cert.type}`);
      }

      // Re-calculate hash to ensure integrity
      const calculatedHash = crypto.createHash('sha256').update(cert.content).digest('hex');
      if (calculatedHash !== cert.hash) {
        brokenLinks.push(`Tampered certificate detected: ${cert.type} (Expected ${cert.hash}, Got ${calculatedHash})`);
      }

      // Check version consistency
      if (cert.version !== targetGovernanceVersion) {
        versionMismatches.push(`Version mismatch on ${cert.type}: Expected ${targetGovernanceVersion}, Got ${cert.version}`);
      }
    }

    return {
      isValid: brokenLinks.length === 0 && versionMismatches.length === 0,
      brokenLinks,
      versionMismatches
    };
  }
}
