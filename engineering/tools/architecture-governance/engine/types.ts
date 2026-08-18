export type Severity = 'INFO' | 'WARNING' | 'ERROR' | 'BLOCKER';
export type RuleCategory = 'Architecture' | 'Platform' | 'Presentation' | 'Backend' | 'Integration' | 'Security';
export type CertificationLevel = 'Architecture Excellence' | 'Certified' | 'Provisionally Certified' | 'Needs Improvement' | 'Rejected';
export type RuleEvaluationStatus = 'PASSED' | 'FAILED' | 'SKIPPED' | 'BLOCKED' | 'NOT_APPLICABLE';

export interface RuleViolation {
  file: string;
  message: string;
  severity: Severity;
}

export interface RuleEvaluationResult {
  ruleId: string;
  status: RuleEvaluationStatus;
  score: number;
  maxScore: number;
  violations: RuleViolation[];
}

export interface IArchitectureRule {
  id: string;
  name: string;
  description: string;
  severity: Severity;
  category: RuleCategory;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  owner: string;
  reference: string;
  sinceVersion: string;
  maxScore: number;
  dependsOn?: string[];

  evaluate(files: string[]): Promise<RuleEvaluationResult>;
}

export interface CategoryScore {
  category: RuleCategory;
  score: number;
  maxScore: number;
  level: CertificationLevel;
}

export interface RegressionDetail {
  ruleId: string;
  ruleName: string;
  reason: string;
}

export interface ArchitectureCertificate {
  certificateId: string;
  boundedContext: string;
  projectVersion: string;
  goldenRuleVersion: string;
  artifactVersion: string;
  repositoryCommit: string;
  buildNumber: string;
  generatedBy: string;
  issueDate: string;
  
  overallScore: number;
  maxScore: number;
  certificationLevel: CertificationLevel;
  
  categories: Record<string, CategoryScore>;
  evaluatedRules: Array<{ ruleId: string; status: RuleEvaluationStatus; score: number }>;
  
  complianceHash: string; // SHA-256 of the above fields
}

export interface GovernanceReport {
  version: string;
  timestamp: string;
  overallScore: number;
  maxScore: number;
  certificationLevel: CertificationLevel;
  status: 'PASS' | 'FAIL';
  categories: Record<string, CategoryScore>;
  results: RuleEvaluationResult[];
  regression: {
    detected: boolean;
    scoreDifference: number;
    details: RegressionDetail[];
  };
  certificate?: ArchitectureCertificate;
}

export interface HistoryRecord {
  version: string;
  timestamp: string;
  score: number;
  certificationLevel: CertificationLevel;
}
