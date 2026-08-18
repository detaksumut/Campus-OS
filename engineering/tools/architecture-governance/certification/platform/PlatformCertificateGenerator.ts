import * as crypto from 'crypto';

export interface PlatformCertificate {
  platformName: string;
  version: string;
  kernelVersion: string;
  modules: string[];
  integrationCertificateHashes: string[];
  averageScore: number;
  certificationLevel: string;
  goldenRuleCompliance: boolean;
  governanceVersion: string;
  signature: string; // Hash signature
  timestamp: string; // Added ONLY at the end as per user rule
}

export class PlatformCertificateGenerator {
  static generate(metadata: Omit<PlatformCertificate, 'signature' | 'timestamp'>): PlatformCertificate {
    // Deterministic sorting
    const sortedModules = [...metadata.modules].sort();
    const sortedHashes = [...metadata.integrationCertificateHashes].sort();

    const preSignData = {
      ...metadata,
      modules: sortedModules,
      integrationCertificateHashes: sortedHashes
    };

    // Deterministic hash creation without timestamp
    const signature = crypto.createHash('sha256').update(JSON.stringify(preSignData)).digest('hex');
    const timestamp = new Date().toISOString();

    return {
      ...preSignData,
      signature,
      timestamp
    };
  }
}
