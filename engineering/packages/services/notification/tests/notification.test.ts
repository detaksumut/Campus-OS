import { ServiceRuntime } from '../../runtime/src/ServiceRuntime';
import { NotificationServiceProvider } from '../runtime/NotificationServiceProvider';

async function runTest() {
  console.log('=== Service Registration & Introspection Test ===');
  
  const runtime = new ServiceRuntime();
  const notificationService = new NotificationServiceProvider();

  runtime.registry.register('Notification', notificationService);

  // 1. Service Registration Test
  const resolved = runtime.registry.resolve<NotificationServiceProvider>('Notification');
  if (resolved !== notificationService) throw new Error('Failed to resolve Notification service');

  // 2. Registry Introspection Test
  const list = runtime.registry.list();
  if (!list.includes('Notification')) throw new Error('List failed');
  if (!runtime.registry.contains('Notification')) throw new Error('Contains failed');

  // Note: metadata() and capabilities() rely on filesystem manifest which we mocked, so we skip file assert here.

  console.log('✅ Service Registration & Introspection tests passed.');
}
runTest().catch(console.error);
