import * as fs from 'fs';
import * as path from 'path';

async function runTest() {
  console.log('=== Backward Compatibility Test ===');
  
  const manifestPath = path.resolve(__dirname, '../manifest/ServiceManifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  
  if (manifest.sdkCompatibility !== '1.x') throw new Error('SDK compatibility broken');
  if (manifest.kernelCompatibility !== '1.x') throw new Error('Kernel compatibility broken');
  
  console.log('✅ Identity Service explicitly maintains v1.x contract compatibility.');
}

runTest().catch(console.error);
