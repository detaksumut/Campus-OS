export interface ScoringWeights {
  backend: number; // 20%
  presentation: number; // 20%
  integration: number; // 30%
  governance: number; // 20%
  telemetry: number; // 10%
}

export interface ModuleMetrics {
  backendCertified: boolean;
  presentationCertified: boolean;
  integrationCertified: boolean;
  governanceCompliance: number; // 0-100
  telemetryCompliance: number; // 0-100
}

export class PlatformScoringEngine {
  private static readonly WEIGHTS: ScoringWeights = {
    backend: 20,
    presentation: 20,
    integration: 30,
    governance: 20,
    telemetry: 10
  };

  static calculateScore(metrics: ModuleMetrics): { score: number, level: string } {
    let score = 0;
    
    if (metrics.backendCertified) score += this.WEIGHTS.backend;
    if (metrics.presentationCertified) score += this.WEIGHTS.presentation;
    if (metrics.integrationCertified) score += this.WEIGHTS.integration;
    
    score += (metrics.governanceCompliance / 100) * this.WEIGHTS.governance;
    score += (metrics.telemetryCompliance / 100) * this.WEIGHTS.telemetry;

    score = Math.round(score);

    let level = 'Failed';
    if (score >= 98) level = 'Enterprise Platinum';
    else if (score >= 95) level = 'Enterprise Gold';
    else if (score >= 90) level = 'Enterprise Silver';
    else if (score >= 80) level = 'Provisionally Certified';

    return { score, level };
  }
}
