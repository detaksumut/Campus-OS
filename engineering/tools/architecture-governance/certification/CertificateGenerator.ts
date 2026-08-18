import * as crypto from 'crypto';
import { ArchitectureCertificate, CertificationLevel, CategoryScore, RuleEvaluationStatus } from '../engine/types';
import * as fs from 'fs';

export class CertificateGenerator {
  static generateHash(data: Omit<ArchitectureCertificate, 'complianceHash'>): string {
    const payload = JSON.stringify({
      certificateId: data.certificateId,
      projectVersion: data.projectVersion,
      goldenRuleVersion: data.goldenRuleVersion,
      repositoryCommit: data.repositoryCommit,
      overallScore: data.overallScore,
      certificationLevel: data.certificationLevel,
      evaluatedRules: data.evaluatedRules
    });
    return crypto.createHash('sha256').update(payload).digest('hex');
  }

  static create(params: {
    boundedContext: string;
    projectVersion: string;
    goldenRuleVersion: string;
    artifactVersion: string;
    repositoryCommit: string;
    buildNumber: string;
    overallScore: number;
    maxScore: number;
    certificationLevel: CertificationLevel;
    categories: Record<string, CategoryScore>;
    evaluatedRules: Array<{ ruleId: string; status: RuleEvaluationStatus; score: number }>;
  }): ArchitectureCertificate {
    const issueDate = new Date().toISOString();
    const certificateId = `ARCH-${issueDate.substring(0,4)}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    
    const certBase: Omit<ArchitectureCertificate, 'complianceHash'> = {
      certificateId,
      boundedContext: params.boundedContext,
      projectVersion: params.projectVersion,
      goldenRuleVersion: params.goldenRuleVersion,
      artifactVersion: params.artifactVersion,
      repositoryCommit: params.repositoryCommit,
      buildNumber: params.buildNumber,
      generatedBy: 'Governance Engine v2.1',
      issueDate,
      overallScore: params.overallScore,
      maxScore: params.maxScore,
      certificationLevel: params.certificationLevel,
      categories: params.categories,
      evaluatedRules: params.evaluatedRules
    };

    const complianceHash = this.generateHash(certBase);

    return {
      ...certBase,
      complianceHash
    };
  }

  static verify(certificatePath: string): boolean {
    if (!fs.existsSync(certificatePath)) {
      throw new Error(`Certificate not found at ${certificatePath}`);
    }
    const cert: ArchitectureCertificate = JSON.parse(fs.readFileSync(certificatePath, 'utf-8'));
    const expectedHash = this.generateHash(cert);
    
    if (expectedHash !== cert.complianceHash) {
      console.error(`❌ INVALID CERTIFICATE: Hash mismatch. Expected ${expectedHash}, got ${cert.complianceHash}`);
      return false;
    }
    console.log(`✅ VALID CERTIFICATE: ${cert.certificateId}`);
    return true;
  }
}
