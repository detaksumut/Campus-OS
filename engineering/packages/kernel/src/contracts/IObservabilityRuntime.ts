import { IRuntime } from './IRuntime';

export interface IObservabilityRuntime extends IRuntime {
  log(level: string, message: string, context?: any): void;
  recordMetric(name: string, value: number): void;
}
