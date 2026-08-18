import { IServiceLifecycle, HealthStatus } from '../contracts/IServiceLifecycle';

export class ServiceRegistry {
  private services: Map<string, IServiceLifecycle> = new Map();

  register(name: string, service: IServiceLifecycle): void {
    if (this.services.has(name)) {
      throw new Error(`Service [${name}] is already registered in ServiceRegistry.`);
    }
    this.services.set(name, service);
  }

  resolve<T extends IServiceLifecycle>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service [${name}] not found in ServiceRegistry.`);
    }
    return service as T;
  }

  getHealthStatuses(): Record<string, HealthStatus> {
    const statuses: Record<string, HealthStatus> = {};
    for (const [name, service] of this.services.entries()) {
      statuses[name] = service.health();
    }
    return statuses;
  }

  async shutdownAll(): Promise<void> {
    for (const [name, service] of this.services.entries()) {
      console.log(`[ServiceRegistry] Shutting down ${name}...`);
      await service.shutdown();
    }
  }

  getAllServices(): IServiceLifecycle[] {
    return Array.from(this.services.values());
  }

  // --- Introspection API ---

  list(): string[] {
    return Array.from(this.services.keys());
  }

  contains(name: string): boolean {
    return this.services.has(name);
  }

  metadata(name: string): any {
    if (!this.contains(name)) throw new Error(`Service [${name}] not found`);
    const manifestPath = require('path').resolve(__dirname, `../../../../services/${name.toLowerCase()}/manifest/ServiceManifest.json`);
    const fs = require('fs');
    if (fs.existsSync(manifestPath)) {
      return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    }
    return {};
  }

  capabilities(name: string): string[] {
    const meta = this.metadata(name);
    return meta.capabilities || [];
  }
}
