import { IRuntime } from './IRuntime';

export interface IKernelRuntime extends IRuntime {
  executeCoreProcedures(): Promise<void>;
}
