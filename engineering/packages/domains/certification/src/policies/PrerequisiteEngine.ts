import { PrerequisiteRule, SimplePrerequisiteRule, CompositePrerequisiteRule, RuleOperator, RuleEvidence, RuleEvaluationResult } from '../contracts';

export interface IRuleProvider {
  readonly providerId: string;
  evaluate(rule: SimplePrerequisiteRule, context: EligibilityContext): Promise<RuleEvaluationResult>;
}

export interface EligibilityContext {
  membershipId: string;
  applicantId: string;
  applicationId: string;
  schemeId: string;
  metadata?: Record<string, unknown>;
}

export interface PrerequisiteEvaluationReport {
  overallPassed: boolean;
  results: RuleEvaluationResult[];
}

export class PrerequisiteEngine {
  private providers: Map<string, IRuleProvider>;

  constructor(providers: IRuleProvider[]) {
    this.providers = new Map(providers.map(p => [p.providerId, p]));
  }

  async evaluate(rule: PrerequisiteRule, context: EligibilityContext): Promise<PrerequisiteEvaluationReport> {
    const results = await this.evaluateRule(rule, context);
    return { overallPassed: results.every(r => r.passed), results };
  }

  private async evaluateRule(rule: PrerequisiteRule, context: EligibilityContext): Promise<RuleEvaluationResult[]> {
    if (rule.type === 'SIMPLE') return [await this.evaluateSimple(rule, context)];
    return this.evaluateComposite(rule, context);
  }

  private async evaluateSimple(rule: SimplePrerequisiteRule, context: EligibilityContext): Promise<RuleEvaluationResult> {
    const provider = this.providers.get(rule.providerId);
    if (!provider) {
      return { ruleId: rule.id, ruleName: rule.name, passed: false, message: `Unknown provider: '${rule.providerId}'` };
    }
    return provider.evaluate(rule, context);
  }

  private async evaluateComposite(rule: CompositePrerequisiteRule, context: EligibilityContext): Promise<RuleEvaluationResult[]> {
    const allResults: RuleEvaluationResult[] = [];
    for (const subRule of rule.rules) {
      allResults.push(...await this.evaluateRule(subRule, context));
    }

    let compositePass: boolean;
    switch (rule.operator as RuleOperator) {
      case 'ALL': compositePass = allResults.every(r => r.passed); break;
      case 'ANY': compositePass = allResults.some(r => r.passed); break;
      case 'NOT': compositePass = !allResults.every(r => r.passed); break;
      default: compositePass = false;
    }

    allResults.unshift({
      ruleId: rule.id,
      ruleName: `${rule.operator}(${rule.name})`,
      passed: compositePass,
      message: `Composite [${rule.operator}]: ${compositePass ? 'PASSED' : 'FAILED'}`
    });
    return allResults;
  }
}
