export type MaturityLevel = 'Scaffolded' | 'Validated' | 'Tested' | 'Certified' | 'Production Ready' | 'Released';

export interface ScoreDimensions {
  architecture: number;
  governance: number;
  testing: number;
  documentation: number;
  security: number;
  compatibility: number;
  determinism: number;
}

export interface Score {
  numeric: number;
  grade: string;
  maturity: MaturityLevel;
  dimensions: ScoreDimensions;
}

export interface Evidence {
  component: string;
  hash: string;
  message: string;
}

export interface CertificateSignature {
  algorithm: string;
  hash: string;
  compilerVersion: string;
  sdkVersion: string;
  kernelVersion: string;
}

export interface OfficialCertificate {
  schemaVersion: string;
  certificateId: string;
  certificateType: string;
  issuedAt: string;
  issuedBy: string;
  status: string;
  score: Score;
  evidence: Evidence[];
  recommendations: string[];
  signature: CertificateSignature;
}
