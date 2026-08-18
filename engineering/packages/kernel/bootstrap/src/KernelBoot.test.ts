import { describe, it, expect } from 'vitest';
import { ServiceContainer } from '@campus-os/kernel-container';
import { EventBus } from '@campus-os/kernel-events';
import { EnvironmentConfigurationProvider } from '@campus-os/kernel-configuration';
import { PluginLoader, DefaultManifestReader } from '@campus-os/kernel-plugin-loader';

describe('Kernel Boot Sequence', () => {
  it('should successfully boot the kernel components in order', () => {
    // Pipeline: Configuration -> Container -> Event Bus -> Plugin Loader -> Ready
    
    // 1. Configuration
    const config = new EnvironmentConfigurationProvider();
    expect(config).toBeDefined();

    // 2. Container
    const container = new ServiceContainer();
    container.register('IConfiguration', 'Singleton', () => config);
    expect(container.resolve('IConfiguration')).toBe(config);

    // 3. Event Bus
    const eventBus = new EventBus();
    container.register('IEventBus', 'Singleton', () => eventBus);
    expect(container.resolve('IEventBus')).toBe(eventBus);

    // 4. Plugin Loader
    const reader = new DefaultManifestReader();
    const loader = new PluginLoader(reader);
    container.register('IPluginLoader', 'Singleton', () => loader);
    expect(container.resolve('IPluginLoader')).toBe(loader);

    // 5. Ready
    expect(container).toBeDefined();
  });
});
