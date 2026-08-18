import { SDKContext } from '../context/SDKContext';
import { ICapabilityRuntime } from '../../../kernel/src/contracts/ICapabilityRuntime';

export class Capability {
  private static get runtime(): ICapabilityRuntime {
    return SDKContext.getRuntime<ICapabilityRuntime>('CapabilityRuntime');
  }

  static async invoke(domain: string, method: string, payload: any): Promise<any> {
    return this.runtime.invokeCapability(domain, method, payload);
  }

  static register(domain: string, capability: any): void {
    this.runtime.registerCapability(domain, capability);
  }
}
