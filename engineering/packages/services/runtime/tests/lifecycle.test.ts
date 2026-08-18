import { ServiceRuntime } from '../src/ServiceRuntime';
import { IdentityServiceProvider } from '../../../identity/runtime/IdentityServiceProvider';
import { HealthStatus } from '../src/contracts/IServiceLifecycle';

async function runTest() {
  console.log('=== Lifecycle Ordering Test ===');
  
  const runtime = new ServiceRuntime();
  const identityService = new IdentityServiceProvider();
  runtime.registry.register('Identity', identityService);

  // 1. Initialize
  await runtime.initialize();
  if (identityService.health() !== HealthStatus.Initializing) throw new Error('Identity not initializing');

  // 2. Boot
  await runtime.boot();

  // 3. Ready
  await runtime.ready();
  if (identityService.health() !== HealthStatus.Ready) throw new Error('Identity not ready');
  if (runtime.health() !== HealthStatus.Ready) throw new Error('Runtime not ready');

  // 4. Shutdown
  await runtime.shutdown();
  if (identityService.health() !== HealthStatus.Stopped) throw new Error('Identity not stopped');
  if (runtime.health() !== HealthStatus.Stopped) throw new Error('Runtime not stopped');

  // 5. Dispose
  await runtime.dispose();

  console.log('✅ ServiceRuntime correctly cascaded lifecycle events (Initialize -> Boot -> Ready -> Shutdown -> Dispose).');
}

runTest().catch(console.error);
