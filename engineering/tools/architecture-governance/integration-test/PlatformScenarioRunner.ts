import { PlatformScenarioRegistry, IPlatformScenario, IScenarioResult } from './PlatformScenarioRegistry';

export interface ScenarioReport {
  totalScenarios: number;
  passedScenarios: number;
  failedScenarios: number;
  results: IScenarioResult[];
}

export class PlatformScenarioRunner {
  static async runAll(): Promise<ScenarioReport> {
    const scenarios = PlatformScenarioRegistry.getScenarios();
    const results: IScenarioResult[] = [];
    
    let passed = 0;
    
    // Deterministic sequential execution
    for (const scenario of scenarios) {
      const res = await scenario.execute();
      results.push(res);
      if (res.passed) passed++;
    }

    return {
      totalScenarios: scenarios.length,
      passedScenarios: passed,
      failedScenarios: scenarios.length - passed,
      results
    };
  }
}
