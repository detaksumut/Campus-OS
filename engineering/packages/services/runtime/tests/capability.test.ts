import { PermissionEvaluator } from '../../../identity/application/PermissionEvaluator';

async function runTest() {
  console.log('=== Capability Consistency Test ===');
  
  const evaluator = new PermissionEvaluator();
  
  // Test valid capability
  const valid = await evaluator.hasPermission('usr-1', 'Student.Read');
  if (!valid) throw new Error('Should allow admin on valid capability');

  // Test invalid capability
  let threw = false;
  try {
    await evaluator.hasPermission('usr-1', 'Random.NonExistentCapability');
  } catch (err: any) {
    threw = true;
    if (!err.message.includes('not registered')) {
      throw new Error('Unexpected error message');
    }
  }

  if (!threw) throw new Error('Failed to reject unknown capability literal');

  console.log('✅ PermissionEvaluator successfully strictly enforces capabilities against the CapabilityRegistry.');
}

runTest().catch(console.error);
