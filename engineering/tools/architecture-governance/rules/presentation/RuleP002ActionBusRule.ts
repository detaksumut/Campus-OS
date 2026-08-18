import { readFileSync } from 'fs';
import { IArchitectureRule, RuleEvaluationResult, RuleCategory } from '../../engine/types';

export class RuleP002ActionBusRule implements IArchitectureRule {
  id = 'Rule-P002';
  name = 'Widget Must Use Action Bus';
  description = 'Widgets must use the Action Bus for all external communication.';
  severity = 'ERROR' as const;
  category = 'Presentation' as RuleCategory;
  priority = 'High' as const;
  owner = 'Presentation Architecture Board';
  reference = 'DefinitionOfPresentationFreeze.md#Action-Bus';
  sinceVersion = 'v1.1';
  maxScore = 15;
  dependsOn = ['Rule-P001'];

  async evaluate(files: string[]): Promise<RuleEvaluationResult> {
    const violations = [];
    const widgetFiles = files.filter(f => f.includes('/presentation/components/') && f.endsWith('.tsx'));

    for (const file of widgetFiles) {
      const content = readFileSync(file, 'utf-8');
      if (!content.includes('useActionBus') && content.includes('dispatch')) {
        violations.push({
          file,
          message: 'Widget performs actions without using the Action Bus.',
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
