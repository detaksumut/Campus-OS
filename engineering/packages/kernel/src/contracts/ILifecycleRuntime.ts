import { IRuntime } from './IRuntime';

export interface ILifecycleRuntime extends IRuntime {
  transitionTo(state: string): Promise<void>;
  getCurrentState(): string;
}
