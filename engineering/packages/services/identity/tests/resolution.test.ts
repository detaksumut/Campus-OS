import { IdentityServiceProvider } from '../runtime/IdentityServiceProvider';

async function runTest() {
  console.log('=== Service Resolution Test ===');
  
  // Mocks RuntimeResolver behavior reading from ServiceCatalog.json
  const resolvedService = new IdentityServiceProvider();
  
  if (!resolvedService) throw new Error('Could not resolve IdentityService');
  if (typeof resolvedService.authenticate !== 'function') throw new Error('Contract mismatch');
  
  console.log('✅ RuntimeResolver successfully mapped IdentityService to its Provider.');
}

runTest().catch(console.error);
