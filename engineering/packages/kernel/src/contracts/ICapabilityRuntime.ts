import { IRuntime } from './IRuntime';

export interface ICapabilityRuntime extends IRuntime {
  registerCapability(domain: string, capability: any): void;
  invokeCapability(domain: string, method: string, payload: any): Promise<any>;
}
