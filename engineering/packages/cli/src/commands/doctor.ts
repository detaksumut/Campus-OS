import { DoctorRuntime } from '../../../doctor/src/DoctorRuntime';

export async function executeDoctor(targetModule?: string) {
  console.log('🩺 Campus Doctor Diagnostics Initializing...\n');
  const runtime = new DoctorRuntime();
  
  try {
    let report;
    if (targetModule) {
      // Very basic mapping for demo purposes
      let moduleName = '';
      if (targetModule === 'sdk') moduleName = 'SDKDoctor';
      if (targetModule === 'architecture') moduleName = 'ArchitectureDoctor';
      if (targetModule === 'templates') moduleName = 'TemplateDoctor';
      
      if (!moduleName) {
        console.error(`Unknown doctor target: ${targetModule}`);
        process.exit(3);
      }
      report = await runtime.runSpecific(moduleName);
    } else {
      report = await runtime.runAll();
    }

    console.log(`Global Status: [${report.status}]`);
    report.diagnoses.forEach(diag => {
      console.log(`\n- Component: ${diag.component} [${diag.status}]`);
      diag.validations.forEach(val => {
        console.log(`   ${val.passed ? '✓' : '✖'} ${val.name}: ${val.message}`);
      });
      if (diag.recommendation) {
        console.log(`   💡 Recommendation: ${diag.recommendation.message}`);
        if (diag.recommendation.actionCommand) {
           console.log(`      Run -> ${diag.recommendation.actionCommand}`);
        }
      }
    });

    console.log(`\nDetailed report written to build/diagnostics/DoctorReport.json`);
    
    const exitCode = DoctorRuntime.getExitCode(report.status);
    process.exit(exitCode);
  } catch (error) {
    console.error('Doctor failed to run:', error);
    process.exit(3);
  }
}
