import * as crypto from 'crypto';
import * as fs from 'fs';

export interface IntegrationCertificate {
  certificateId: string;
  backendCertificateReference: string;
  presentationCertificateReference: string;
  issueDate: string;
  compatibilityScore: number;
  integrationScore: number;
  maxScore: number;
  runtimeVerificationResult: 'PASSED' | 'FAILED';
  certificationLevel: string;
  complianceHash: string;
}

export class IntegrationCertificateGenerator {
  static generate(metadata: Omit<IntegrationCertificate, 'certificateId' | 'issueDate' | 'complianceHash'>): IntegrationCertificate {
    const issueDate = new Date().toISOString();
    const certificateId = `INT-CERT-${Date.now()}`;
    
    const preHashData = {
      ...metadata,
      certificateId,
      issueDate
    };
    
    const complianceHash = crypto.createHash('sha256').update(JSON.stringify(preHashData)).digest('hex');
    
    return {
      ...preHashData,
      complianceHash
    };
  }

  static verify(certPath: string): boolean {
    if (!fs.existsSync(certPath)) return false;
    const cert: IntegrationCertificate = JSON.parse(fs.readFileSync(certPath, 'utf-8'));
    
    const { complianceHash, ...preHashData } = cert;
    const computedHash = crypto.createHash('sha256').update(JSON.stringify(preHashData)).digest('hex');
    
    return computedHash === complianceHash;
  }
}
