import { SimulatorRuntime } from '../src/SimulatorRuntime';
import * as path from 'path';

async function runTest() {
  console.log('=== Simulator Execution Test ===');
  
  const runtime = new SimulatorRuntime();
  const scenarioPath = path.resolve(__dirname, '../../scenarios/StudentRegistration.success.json');
  
  const report = await runtime.runScenario(scenarioPath);
  
  if (report.workflow !== 'StudentRegistration') throw new Error('Workflow mismatch');
  if (report.status !== 'Completed') throw new Error('Status mismatch');
  if (report.timeline.length < 3) throw new Error('Timeline did not log mocked repository calls');
  
  console.log('✅ Simulator correctly intercepted repository calls and generated timeline report.');
}

runTest().catch(console.error);
