import { BaseRuntime } from './BaseRuntime';
import { IObservabilityRuntime } from '../contracts/IObservabilityRuntime';

export class ObservabilityRuntime extends BaseRuntime implements IObservabilityRuntime {
  constructor() {
    super('ObservabilityRuntime');
  }

  log(level: string, message: string, context?: any): void {
    console.log(`[${level.toUpperCase()}] ${message}`, context || '');
  }

  recordMetric(name: string, value: number): void {
    console.log(`[METRIC] ${name}: ${value}`);
  }
}
