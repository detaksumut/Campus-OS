import * as crypto from 'crypto';
import * as fs from 'fs';

export interface PresentationCertificate {
  certificateId: string;
  presentationAbiVersion: string;
  pluginVersion: string;
  kernelVersion: string;
  issueDate: string;
  certificationLevel: string;
  score: number;
  maxScore: number;
  widgetCount: number;
  actionCount: number;
  routeCount: number;
  complianceHash: string;
}

export class PresentationCertificateGenerator {
  static generate(metadata: Omit<PresentationCertificate, 'certificateId' | 'issueDate' | 'complianceHash'>): PresentationCertificate {
    const issueDate = new Date().toISOString();
    const certificateId = `PRS-CERT-${Date.now()}`;
    
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
    const cert: PresentationCertificate = JSON.parse(fs.readFileSync(certPath, 'utf-8'));
    
    const { complianceHash, ...preHashData } = cert;
    const computedHash = crypto.createHash('sha256').update(JSON.stringify(preHashData)).digest('hex');
    
    return computedHash === complianceHash;
  }
}
