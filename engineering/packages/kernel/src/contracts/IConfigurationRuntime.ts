import { IRuntime } from './IRuntime';

export interface IConfigurationRuntime extends IRuntime {
  get(key: string): any;
  loadEnvironment(): Promise<void>;
}
