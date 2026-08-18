import { readFileSync } from 'fs';
import { IArchitectureRule, RuleEvaluationResult, RuleCategory } from '../../engine/types';

export class RuleI001ActionRuntimeBoundaryRule implements IArchitectureRule {
  id = 'Rule-I001';
  name = 'Action Runtime Boundary';
  description = 'Presentation Layer must only access Backend through Action Runtime.';
  severity = 'BLOCKER' as const;
  category = 'Integration' as RuleCategory;
  priority = 'Critical' as const;
  owner = 'Integration Architecture Board';
  reference = 'DefinitionOfIntegrationCertification.md#Action-Runtime-Boundary';
  sinceVersion = 'v1.2';
  maxScore = 20;

  async evaluate(files: string[]): Promise<RuleEvaluationResult> {
    const violations = [];
    const uiFiles = files.filter(f => f.includes('/presentation/') && f.endsWith('.ts'));

    for (const file of uiFiles) {
      const content = readFileSync(file, 'utf-8');
      if (content.includes('import') && content.includes('Api') && !file.includes('ActionRuntime')) {
        violations.push({
          file,
          message: 'Presentation code bypasses Action Runtime to access Backend API directly.',
          severity: this.severity
        });
      }
    }

    return {
      ruleId: this.id,
      status: violations.length === 0 ? 'PASSED' : 'FAILED',
      score: violations.length > 0 ? 0 : this.maxScore,
      maxScore: this.maxScore,
      violations
    };
  }
}
