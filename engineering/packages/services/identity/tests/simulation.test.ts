import { IdentityServiceProvider } from '../runtime/IdentityServiceProvider';

async function runTest() {
  console.log('=== Simulator Integration Test ===');
  
  const identity = new IdentityServiceProvider();
  
  // Simulate auth
  const user = await identity.authenticate({ username: 'admin', password: 'campus123' });
  if (user.id !== 'usr-1') throw new Error('Auth mock failed');
  
  // Simulate token
  const token = await identity.generateToken(user);
  const isValid = await identity.validateToken(token);
  if (!isValid) throw new Error('Token validation mock failed');

  // Simulate capability evaluation
  const hasPerm = await identity.hasPermission(user.id, 'ManageUsers');
  if (!hasPerm) throw new Error('Permission mock failed');

  console.log('✅ Identity Service ran successfully within the isolated simulation environment.');
}

runTest().catch(console.error);
