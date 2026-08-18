import * as fs from 'fs';
import * as path from 'path';
import { Scenario, SimulationReport, SimulationEvent } from './contracts/SimulatorContracts';
import { MockRepositoryRuntime } from './mocks/MockRepositoryRuntime';

export class SimulatorRuntime {
  
  async runScenario(scenarioFile: string): Promise<SimulationReport> {
    if (!fs.existsSync(scenarioFile)) {
       throw new Error(`Scenario file not found: ${scenarioFile}`);
    }

    const scenario: Scenario = JSON.parse(fs.readFileSync(scenarioFile, 'utf8'));
    const timeline: SimulationEvent[] = [];
    const startTime = new Date().toISOString();

    timeline.push({
      timestamp: startTime,
      component: 'Simulator',
      action: 'START_WORKFLOW',
      payload: { workflow: scenario.targetWorkflow }
    });

    // Initialize Mocks based on scenario
    const mockRepo = new MockRepositoryRuntime(scenario.mockInjections.repositories || {});

    // --- SIMULATED EXECUTION ---
    // In a real implementation, this would inject the mocks into the actual SDK context 
    // and execute the target Application Service/Workflow class. 
    // For this blueprint, we simulate the tracing behavior:

    timeline.push({
      timestamp: new Date().toISOString(),
      component: 'ApplicationService',
      action: 'VALIDATE_PAYLOAD'
    });

    // Simulate repo interaction
    await mockRepo.findById('aggregate-123');
    await mockRepo.save('aggregate-123', { status: 'processed' });

    timeline.push(...mockRepo.getLog());

    timeline.push({
      timestamp: new Date().toISOString(),
      component: 'MockEventRuntime',
      action: 'PUBLISH_EVENT',
      payload: { eventName: `${scenario.targetWorkflow}CompletedEvent` }
    });

    // --- END SIMULATED EXECUTION ---

    const endTime = new Date().toISOString();
    timeline.push({
      timestamp: endTime,
      component: 'Simulator',
      action: 'WORKFLOW_COMPLETED'
    });

    const report: SimulationReport = {
      scenarioId: scenario.id,
      workflow: scenario.targetWorkflow,
      startTime,
      endTime,
      status: 'Completed',
      timeline,
      finalState: {
        repository: 'aggregate-123 saved'
      }
    };

    const outPath = path.resolve(__dirname, '../../build/simulations', `${scenario.id}.SimulationReport.json`);
    if (!fs.existsSync(path.dirname(outPath))) {
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
    }
    fs.writeFileSync(outPath, JSON.stringify(report, null, 2));

    return report;
  }
}
