import { KernelBuilder } from '../../kernel/src/kernel/KernelBuilder';
import { SDKProvider, Workflow, Logger, Storage, SDKNotInitializedError } from '../src/index';

async function runSDKTest() {
  console.log('=== Campus SDK Integration Test ===');

  // Test 1: Calling SDK before initialization must fail
  try {
    Logger.info('This should fail');
    throw new Error('Test failed: Should have thrown SDKNotInitializedError');
  } catch (err: any) {
    if (err instanceof SDKNotInitializedError) {
      console.log('✅ SDK successfully blocked uninitialized access.');
    } else {
      throw err;
    }
  }

  // 2. Initialize Kernel & SDK
  const kernel = KernelBuilder.createDefaultKernel();
  await kernel.boot();
  
  SDKProvider.initialize(kernel);

  // 3. Test Façade Delegation
  try {
    Logger.info('SDK Logger Façade working!');
    const sagaId = await Workflow.start('StudentRegistration', { studentId: 123 });
    console.log(`✅ Workflow Façade working! Saga ID: ${sagaId}`);
  } catch (err) {
    throw new Error(`Façade delegation failed: ${err}`);
  }

  // 4. Test Phase F Stub Façades
  try {
    await Storage.save('/docs/ktm.pdf', Buffer.from('mock'));
    throw new Error('Test failed: Should have thrown NotImplementedError');
  } catch (err: any) {
    if (err.name === 'NotImplementedError') {
      console.log('✅ Phase F Façade (Storage) successfully threw NotImplementedError.');
    } else {
      throw err;
    }
  }

  await kernel.shutdown();
  console.log('=== All SDK Tests Passed ===');
}

runSDKTest().catch(console.error);
