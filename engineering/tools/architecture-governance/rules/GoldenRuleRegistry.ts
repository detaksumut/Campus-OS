import { DependencyDirectionRule } from './DependencyDirectionRule';
import { NoOrmLeakageRule } from './NoOrmLeakageRule';
import { RuleP001NoApiAccessRule } from './presentation/RuleP001NoApiAccessRule';
import { RuleP002ActionBusRule } from './presentation/RuleP002ActionBusRule';
import { RuleI001ActionRuntimeBoundaryRule } from './integration/RuleI001ActionRuntimeBoundaryRule';
import { RuleI006RuntimeDispatchIntegrityRule } from './integration/RuleI006RuntimeDispatchIntegrityRule';
import { IArchitectureRule } from '../engine/types';

export class GoldenRuleRegistry {
  private static versionedRules: Record<string, IArchitectureRule[]> = {
    'v1.0': [
      new DependencyDirectionRule(),
      new NoOrmLeakageRule(),
    ],
    'v1.1': [
      new DependencyDirectionRule(),
      new NoOrmLeakageRule(),
      new RuleP001NoApiAccessRule(),
      new RuleP002ActionBusRule(),
    ],
    'v1.2': [
      new DependencyDirectionRule(),
      new NoOrmLeakageRule(),
      new RuleP001NoApiAccessRule(),
      new RuleP002ActionBusRule(),
      new RuleI001ActionRuntimeBoundaryRule(),
      new RuleI006RuntimeDispatchIntegrityRule()
    ]
  };

  static getRules(version: string = 'v1.2'): IArchitectureRule[] {
    return this.versionedRules[version] || [];
  }
}
