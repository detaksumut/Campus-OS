import { Capability } from '../contracts/capability.contract';

class CapabilityRegistryImpl {
  private capabilities: Map<string, Capability> = new Map();

  register(capability: Capability) {
    if (this.capabilities.has(capability.id)) {
      console.warn(`[CapabilityRegistry] Capability ${capability.id} is already registered. Overwriting.`);
    }
    this.capabilities.set(capability.id, capability);
  }

  getCapability(id: string): Capability | undefined {
    return this.capabilities.get(id);
  }

  getAll(): Capability[] {
    return Array.from(this.capabilities.values());
  }

  getByModule(module: string): Capability[] {
    return this.getAll().filter(c => c.module === module);
  }
}

export const CapabilityRegistry = new CapabilityRegistryImpl();
