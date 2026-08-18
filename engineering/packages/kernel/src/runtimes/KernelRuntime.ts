import { BaseRuntime } from './BaseRuntime';
import { IKernelRuntime } from '../contracts/IKernelRuntime';

export class KernelRuntime extends BaseRuntime implements IKernelRuntime {
  constructor() {
    super('KernelRuntime');
  }

  async executeCoreProcedures(): Promise<void> {
    console.log(`[${this.name}] Executing core procedures...`);
  }
}
