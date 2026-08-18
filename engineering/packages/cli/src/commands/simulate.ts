import { SimulatorRuntime } from '../../../simulator/src/SimulatorRuntime';
import * as path from 'path';

export async function executeSimulator(workflowName: string, scenarioFile: string) {
  console.log(`\n🧪 Campus Runtime Simulator`);
  console.log(`Workflow: ${workflowName}`);
  console.log(`Scenario: ${scenarioFile}\n`);

  try {
    const runtime = new SimulatorRuntime();
    // Resolve relative to CWD or absolute path
    const targetScenario = path.resolve(process.cwd(), scenarioFile);
    
    const report = await runtime.runScenario(targetScenario);
    
    console.log(`Simulation Status: [${report.status}]`);
    console.log(`Timeline:`);
    report.timeline.forEach(evt => {
       console.log(`  [${evt.timestamp}] ${evt.component} -> ${evt.action}`);
    });
    
    console.log(`\nSimulation Report written to build/simulations/${report.scenarioId}.SimulationReport.json`);
  } catch (err) {
    console.error('Simulation Failed:', err);
    process.exit(1);
  }
}
