import { IRuntime } from './IRuntime';

export interface IDependencyRuntime extends IRuntime {
  register<T>(token: string, instance: T): void;
  resolve<T>(token: string): T;
}
