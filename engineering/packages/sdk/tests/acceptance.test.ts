import * as fs from 'fs';
import * as path from 'path';

// This is a pseudo-test demonstrating the rules mandated by the Chief Architect.
async function runAcceptanceTest() {
  console.log('=== SDK Acceptance & Governance Test ===');

  // 1. Dependency Boundary Test
  console.log('Running Dependency Boundary Test...');
  const helloCampusPath = path.resolve(__dirname, '../../examples/hello-campus/index.ts');
  const code = fs.readFileSync(helloCampusPath, 'utf8');
  
  // We allow the bootstrap script to import the kernel builder, but nothing else.
  // In a real strict environment, even the KernelBuilder is abstracted by an AppHost package.
  if (code.includes('import { KernelRuntime }')) {
    throw new Error('Dependency Boundary Violation: hello-campus imported an internal Kernel runtime.');
  }
  console.log('✅ Dependency Boundary Test Passed (No illegal internal Kernel imports).');

  // 2. JSDoc Stability Verification
  console.log('Running JSDoc Stability Verification...');
  const workflowFacade = fs.readFileSync(path.resolve(__dirname, '../src/facades/Workflow.ts'), 'utf8');
  if (!workflowFacade.includes('@stable')) {
    throw new Error('JSDoc Stability Verification Failed: Workflow is missing @stable annotation.');
  }
  
  const storageFacade = fs.readFileSync(path.resolve(__dirname, '../src/facades/SharedServices.ts'), 'utf8');
  if (!storageFacade.includes('@experimental')) {
    throw new Error('JSDoc Stability Verification Failed: Storage is missing @experimental annotation.');
  }
  console.log('✅ JSDoc Stability Verification Passed.');

  // 3. Compatibility Test
  console.log('Running Compatibility Test...');
  const manifest = require('../SDKManifest.json');
  const compatibility = require('../SDKCompatibility.json');
  if (manifest.sdkVersion !== compatibility.sdkVersion) {
    throw new Error('Compatibility Test Failed: SDK Version mismatch between manifests.');
  }
  console.log('✅ Compatibility Test Passed.');

  // 4. Public API Snapshot Test
  console.log('Running Public API Snapshot Test...');
  const index = fs.readFileSync(path.resolve(__dirname, '../src/index.ts'), 'utf8');
  const requiredExports = ['Workflow', 'Logger', 'Identity', 'Security', 'Health', 'Version', 'Storage'];
  for (const exp of requiredExports) {
    if (!index.includes(exp)) {
      throw new Error(`Snapshot Test Failed: Missing export ${exp}`);
    }
  }
  console.log('✅ Public API Snapshot Test Passed.');
  
  console.log('=== All Acceptance Tests Passed ===');
}

runAcceptanceTest().catch((err) => {
  console.error(err);
  process.exit(1);
});
