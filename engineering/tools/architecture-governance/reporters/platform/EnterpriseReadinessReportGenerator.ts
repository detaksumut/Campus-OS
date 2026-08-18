import * as fs from 'fs';
import { PlatformCompatibilityMatrix } from './PlatformCompatibilityMatrixGenerator';
import { ScenarioReport } from '../integration-test/PlatformScenarioRunner';
import { PlatformDependencyGraph } from './PlatformDependencyGraphGenerator';

export class EnterpriseReadinessReportGenerator {
  static generate(
    matrix: PlatformCompatibilityMatrix, 
    scenarios: ScenarioReport, 
    graph: PlatformDependencyGraph,
    outputPath: string
  ): void {
    const md = `# Enterprise Readiness Report

## Platform Overview
- **Overall Score**: ${matrix.averageScore}
- **Platform Level**: ${matrix.certificationLevel}

## Module Readiness
- **Certified Modules**: ${matrix.certifiedModules.join(', ')}
- **Failed Modules**: ${matrix.failedModules.length > 0 ? matrix.failedModules.join(', ') : 'None'}

## Dependency Health
- **Cycle Detected**: ${graph.hasCycle ? 'Yes ❌' : 'No ✅'}
- **Cycles**: ${graph.hasCycle ? JSON.stringify(graph.cycles) : 'N/A'}

## Scenario Coverage
- **Total Scenarios Evaluated**: ${scenarios.totalScenarios}
- **Passed**: ${scenarios.passedScenarios}
- **Failed**: ${scenarios.failedScenarios}

## Release Recommendation
${matrix.certificationLevel === 'Failed' || graph.hasCycle || scenarios.failedScenarios > 0 
  ? '> [!CAUTION]\n> Platform is NOT ready for Enterprise Release.' 
  : '> [!NOTE]\n> Platform is fully certified and recommended for Enterprise Release.'}
`;

    fs.writeFileSync(outputPath, md, 'utf-8');
  }
}
