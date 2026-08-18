export interface ModuleStatus {
  backend: boolean;
  presentation: boolean;
  integration: boolean;
  platform: boolean;
  score: number;
  level: string;
}

export interface PlatformCompatibilityMatrix {
  modules: Record<string, ModuleStatus>;
  totalScore: number;
  averageScore: number;
  failedModules: string[];
  warnings: string[];
  certifiedModules: string[];
  certificationLevel: string;
}

export class PlatformCompatibilityMatrixGenerator {
  static generate(moduleStatuses: Record<string, ModuleStatus>): PlatformCompatibilityMatrix {
    const modulesKeys = Object.keys(moduleStatuses).sort();
    
    let totalScore = 0;
    const failedModules: string[] = [];
    const certifiedModules: string[] = [];
    
    for (const key of modulesKeys) {
      const status = moduleStatuses[key];
      totalScore += status.score;
      if (status.level === 'Failed') {
        failedModules.push(key);
      } else {
        certifiedModules.push(key);
      }
    }
    
    const count = modulesKeys.length;
    const averageScore = count === 0 ? 0 : Math.round(totalScore / count);
    
    let certificationLevel = 'Failed';
    if (averageScore >= 98) certificationLevel = 'Enterprise Platinum';
    else if (averageScore >= 95) certificationLevel = 'Enterprise Gold';
    else if (averageScore >= 90) certificationLevel = 'Enterprise Silver';
    else if (averageScore >= 80) certificationLevel = 'Provisionally Certified';

    // Deterministic sorting of arrays
    failedModules.sort();
    certifiedModules.sort();

    return {
      modules: moduleStatuses,
      totalScore,
      averageScore,
      failedModules,
      warnings: failedModules.length > 0 ? ['Some modules failed certification.'] : [],
      certifiedModules,
      certificationLevel
    };
  }
}
