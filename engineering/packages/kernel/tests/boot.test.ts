import { KernelBuilder } from '../src/kernel/KernelBuilder';
import { KernelState } from '../src/kernel/KernelState';
import { ConfigurationRuntime } from '../src/runtimes/ConfigurationRuntime';
import { ObservabilityRuntime } from '../src/runtimes/ObservabilityRuntime';

async function runIntegrationTest() {
  console.log('=== Campus Kernel Integration Test ===');
  
  const kernel = KernelBuilder.createDefaultKernel();
  
  try {
    // 1. Verify initial state
    if (kernel.getState() !== KernelState.BOOTING) {
      throw new Error(`Expected state BOOTING, got ${kernel.getState()}`);
    }
    console.log('✅ Initial state verified: BOOTING');

    // 2. Boot the kernel
    await kernel.boot();
    
    // 3. Verify ready state
    if (kernel.getState() !== KernelState.READY) {
      throw new Error(`Expected state READY, got ${kernel.getState()}`);
    }
    console.log('✅ Boot state verified: READY');

    // 4. Shutdown the kernel
    await kernel.shutdown();
    
    // 5. Verify terminated state
    if (kernel.getState() !== KernelState.TERMINATING) {
      throw new Error(`Expected state TERMINATING, got ${kernel.getState()}`);
    }
    console.log('✅ Shutdown state verified: TERMINATING');
    
    console.log('=== All Tests Passed ===');
  } catch (error) {
    console.error('❌ Test Failed:', error);
    process.exit(1);
  }
}

runIntegrationTest();
