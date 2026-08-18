import * as crypto from 'crypto';
import { EnterpriseReleaseManifest } from '../platform/EnterpriseReleaseManifestGenerator';

export class EnterpriseReleaseIntegrityValidator {
  static validate(manifest: EnterpriseReleaseManifest, rawManifestStr: string): boolean {
    // Verify that the Release Manifest hasn't been tampered with
    // By re-hashing the pre-sign data
    const sortedModules = [...manifest.modules].sort();
    const sortedCerts = [...manifest.certificates].sort();

    const preSignData = {
      kernelVersion: manifest.kernelVersion,
      platformVersion: manifest.platformVersion,
      governanceVersion: manifest.governanceVersion,
      modules: sortedModules,
      certificates: sortedCerts,
      compatibilityMatrixHash: manifest.compatibilityMatrixHash,
      platformCertificateHash: manifest.platformCertificateHash
    };

    const calculatedSignature = crypto.createHash('sha256').update(JSON.stringify(preSignData)).digest('hex');
    
    return calculatedSignature === manifest.releaseSignature;
  }
}
