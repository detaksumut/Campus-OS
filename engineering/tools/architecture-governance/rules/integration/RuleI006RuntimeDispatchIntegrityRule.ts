import { readFileSync } from 'fs';
import { IArchitectureRule, RuleEvaluationResult, RuleCategory } from '../../engine/types';

export class RuleI006RuntimeDispatchIntegrityRule implements IArchitectureRule {
  id = 'Rule-I006';
  name = 'Runtime Dispatch Integrity';
  description = 'Action Runtime dispatchers must implement permission and payload validation before executing backend facade.';
  severity = 'ERROR' as const;
  category = 'Integration' as RuleCategory;
  priority = 'High' as const;
  owner = 'Integration Architecture Board';
  reference = 'DefinitionOfIntegrationCertification.md#Runtime-Dispatch-Integrity';
  sinceVersion = 'v1.2';
  maxScore = 15;
  dependsOn = ['Rule-I001'];

  async evaluate(files: string[]): Promise<RuleEvaluationResult> {
    const violations = [];
    const runtimeFiles = files.filter(f => f.includes('ActionRuntime.ts'));

    for (const file of runtimeFiles) {
      const content = readFileSync(file, 'utf-8');
      if (!content.includes('validatePermission') || !content.includes('validatePayload')) {
        violations.push({
          file,
          message: 'ActionRuntime lacks mandatory Permission or Payload validation stages in the dispatch pipeline.',
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
