import { ServiceRuntime } from '../src/ServiceRuntime';
import { IdentityServiceProvider } from '../../../identity/runtime/IdentityServiceProvider';
import { HealthStatus } from '../src/contracts/IServiceLifecycle';

async function runTest() {
  console.log('=== Service Registry Test ===');
  
  const runtime = new ServiceRuntime();
  const identityService = new IdentityServiceProvider();

  // Test Registration
  runtime.registry.register('Identity', identityService);
  
  // Test Resolution
  const resolved = runtime.registry.resolve<IdentityServiceProvider>('Identity');
  if (resolved !== identityService) throw new Error('Resolution failed');

  // Test Health aggregation before ready
  let health = runtime.health();
  if (health !== HealthStatus.Unknown) throw new Error('Health should be unknown before init');

  console.log('✅ ServiceRuntime successfully registered and resolved IdentityService.');
}

runTest().catch(console.error);
