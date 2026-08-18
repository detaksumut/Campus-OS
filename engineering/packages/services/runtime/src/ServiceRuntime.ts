import { IServiceLifecycle, HealthStatus } from './contracts/IServiceLifecycle';
import { ServiceRegistry } from './registry/ServiceRegistry';

export class ServiceRuntime implements IServiceLifecycle {
  public registry = new ServiceRegistry();
  private currentHealth = HealthStatus.Unknown;

  async initialize(): Promise<void> {
    this.currentHealth = HealthStatus.Initializing;
    for (const service of this.registry.getAllServices()) {
      await service.initialize();
    }
  }

  async boot(): Promise<void> {
    for (const service of this.registry.getAllServices()) {
      await service.boot();
    }
  }

  async ready(): Promise<void> {
    for (const service of this.registry.getAllServices()) {
      await service.ready();
    }
    this.currentHealth = HealthStatus.Ready;
  }

  async shutdown(): Promise<void> {
    this.currentHealth = HealthStatus.Stopping;
    await this.registry.shutdownAll();
    this.currentHealth = HealthStatus.Stopped;
  }

  async dispose(): Promise<void> {
    for (const service of this.registry.getAllServices()) {
      await service.dispose();
    }
  }

  health(): HealthStatus {
    // If runtime is ready, ensure all children are also ready, else return Degraded
    if (this.currentHealth === HealthStatus.Ready) {
      const statuses = this.registry.getHealthStatuses();
      for (const status of Object.values(statuses)) {
        if (status !== HealthStatus.Ready) {
          return HealthStatus.Degraded;
        }
      }
    }
    return this.currentHealth;
  }
}
