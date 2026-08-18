import { readFileSync } from 'fs';
import { IArchitectureRule, RuleEvaluationResult, RuleCategory } from '../engine/types';

export class NoOrmLeakageRule implements IArchitectureRule {
  id = 'Rule-002';
  name = 'No ORM Leakage';
  description = 'Domain and Repository layers must not import ORMs (e.g. drizzle-orm, prisma).';
  severity = 'BLOCKER' as const;
  category = 'Backend' as RuleCategory;
  priority = 'Critical' as const;
  owner = 'Platform Engineering';
  reference = 'DefinitionOfBackendFreeze.md#ORM-Independence';
  sinceVersion = 'v1.0';
  maxScore = 20;
  dependsOn = ['Rule-001']; // Demonstration of dependency graph

  async evaluate(files: string[]): Promise<RuleEvaluationResult> {
    const violations = [];
    const targetFiles = files.filter(f => f.includes('/domains/') && f.endsWith('.ts'));

    for (const file of targetFiles) {
      const content = readFileSync(file, 'utf-8');
      if (content.includes("from 'drizzle-orm") || content.includes("from '@prisma/client")) {
        violations.push({
          file,
          message: 'ORM leak detected: Domain/Repository directly imports an ORM framework.',
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
