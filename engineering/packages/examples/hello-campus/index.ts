import { SDKProvider, Workflow, Logger, Version, Health } from '../../sdk/src/index';
import { KernelBuilder } from '../../kernel/src/kernel/KernelBuilder';

/**
 * HELLO CAMPUS
 * An example mock bounded context to prove that Domain Applications
 * can run exclusively using the @campus-os/sdk without any direct imports
 * of internal implementation details from @campus-os/kernel.
 */
async function startApplication() {
  console.log('Booting Campus Kernel...');
  
  // 1. The Host Application (e.g. Next.js server or microservice entrypoint)
  // is the ONLY place where Kernel is allowed to be instantiated.
  // The actual Domain logic inside this module MUST NOT access the Kernel directly.
  const kernel = KernelBuilder.createDefaultKernel();
  await kernel.boot();
  
  // 2. Inject Kernel into the SDK.
  SDKProvider.initialize(kernel);

  // 3. Pure Domain Logic strictly using SDK Façades.
  console.log('\n--- DOMAIN LOGIC EXECUTION ---');
  Logger.info('Hello Campus Application Starting...');
  
  const isCompatible = Version.compatibility();
  Logger.debug(`SDK Compatibility: ${isCompatible}`);
  
  const status = Health.status();
  Logger.info(`System Health: ${status}`);
  
  const sagaId = await Workflow.start('HelloCampusBootSequence', { timestamp: Date.now() });
  Logger.info(`Workflow Saga Started: ${sagaId}`);

  console.log('--- DOMAIN LOGIC COMPLETE ---\n');

  await kernel.shutdown();
}

startApplication().catch((err) => {
  console.error('Hello Campus Failed:', err);
  process.exit(1);
});
