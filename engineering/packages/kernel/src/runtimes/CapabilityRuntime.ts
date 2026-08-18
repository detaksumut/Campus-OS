import { BaseRuntime } from './BaseRuntime';
import { ICapabilityRuntime } from '../contracts/ICapabilityRuntime';

export class CapabilityRuntime extends BaseRuntime implements ICapabilityRuntime {
  private capabilities = new Map<string, any>();

  constructor() {
    super('CapabilityRuntime');
  }

  registerCapability(domain: string, capability: any): void {
    this.capabilities.set(domain, capability);
  }

  async invokeCapability(domain: string, method: string, payload: any): Promise<any> {
    const capability = this.capabilities.get(domain);
    if (!capability || typeof capability[method] !== 'function') {
      throw new Error(`Capability [${domain}.${method}] not found.`);
    }
    return capability[method](payload);
  }
}
