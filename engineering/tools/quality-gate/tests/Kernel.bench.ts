import { bench, describe } from 'vitest';
import { ServiceContainer, EventBus } from '@campus-os/kernel';
import { CapabilityRegistry } from '@campus-os/identity-sdk';

describe('Phase 2.2: Performance Certification', () => {
  bench('DI Resolve', () => {
    const container = new ServiceContainer();
    container.register('IEventBus', 'Singleton', () => new EventBus());
    container.resolve('IEventBus');
  });

  bench('Event Publish', async () => {
    const bus = new EventBus();
    bus.subscribe('Test', () => {});
    await bus.publish('Test', { data: 1 });
  });

  bench('Capability Resolution', () => {
    CapabilityRegistry.register({ id: 'bench.cap', name: 'Bench', module: 'core', category: 'c', description: '', system: true });
    CapabilityRegistry.get('bench.cap');
  });
});
