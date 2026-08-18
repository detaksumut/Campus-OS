import * as crypto from 'crypto';

export interface EnterpriseReleaseManifest {
  kernelVersion: string;
  platformVersion: string;
  governanceVersion: string;
  modules: string[];
  certificates: string[];
  compatibilityMatrixHash: string;
  platformCertificateHash: string;
  releaseSignature: string;
}

export class EnterpriseReleaseManifestGenerator {
  static generate(data: Omit<EnterpriseReleaseManifest, 'releaseSignature'>): EnterpriseReleaseManifest {
    // Deterministic array sorting
    const sortedModules = [...data.modules].sort();
    const sortedCerts = [...data.certificates].sort();

    const preSignData = {
      ...data,
      modules: sortedModules,
      certificates: sortedCerts
    };

    const releaseSignature = crypto.createHash('sha256').update(JSON.stringify(preSignData)).digest('hex');

    return {
      ...preSignData,
      releaseSignature
    };
  }
}
