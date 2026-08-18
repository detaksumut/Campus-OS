import { readFileSync } from 'fs';
import { IArchitectureRule, RuleEvaluationResult, RuleCategory } from '../../engine/types';

export class RuleP001NoApiAccessRule implements IArchitectureRule {
  id = 'Rule-P001';
  name = 'Widget No Direct API Access';
  description = 'Widgets must not import APIs or Facades directly.';
  severity = 'BLOCKER' as const;
  category = 'Presentation' as RuleCategory;
  priority = 'Critical' as const;
  owner = 'Presentation Architecture Board';
  reference = 'DefinitionOfPresentationFreeze.md#Widget-Statelessness';
  sinceVersion = 'v1.1';
  maxScore = 20;

  async evaluate(files: string[]): Promise<RuleEvaluationResult> {
    const violations = [];
    const widgetFiles = files.filter(f => f.includes('/presentation/components/') && f.endsWith('.tsx'));

    for (const file of widgetFiles) {
      const content = readFileSync(file, 'utf-8');
      if (content.includes('Api') || content.includes('Facade') || content.includes('Repository')) {
        violations.push({
          file,
          message: 'Widget directly imports Backend API or Facade. Use Action Bus instead.',
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
