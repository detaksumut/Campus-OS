import { readFileSync } from 'fs';
import { IArchitectureRule, RuleEvaluationResult, RuleCategory } from '../engine/types';

export class DependencyDirectionRule implements IArchitectureRule {
  id = 'Rule-001';
  name = 'Dependency Direction';
  description = 'Domains must not import from Presentation or higher-level infrastructural layers.';
  severity = 'BLOCKER' as const;
  category = 'Architecture' as RuleCategory;
  priority = 'Critical' as const;
  owner = 'Enterprise Architecture Board';
  reference = 'DefinitionOfBackendFreeze.md#Strict-Dependency-Flow';
  sinceVersion = 'v1.0';
  maxScore = 20;

  async evaluate(files: string[]): Promise<RuleEvaluationResult> {
    const violations = [];
    const domainFiles = files.filter(f => f.includes('/domains/') && f.endsWith('.ts'));

    for (const file of domainFiles) {
      const content = readFileSync(file, 'utf-8');
      if (content.includes("from '../../presentation") || content.includes("from '@campus-os/presentation")) {
        violations.push({
          file,
          message: 'Domain layer imported Presentation layer.',
          severity: this.severity
        });
      }
    }

    const score = violations.length > 0 ? 0 : this.maxScore;
    return {
      ruleId: this.id,
      status: violations.length === 0 ? 'PASSED' : 'FAILED',
      score,
      maxScore: this.maxScore,
      violations
    };
  }
}
