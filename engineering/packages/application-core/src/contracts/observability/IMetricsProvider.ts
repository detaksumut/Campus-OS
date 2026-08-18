import { ICorrelationContext } from './ICorrelationContext';

export interface IMetricsProvider {
  incrementCounter(name: string, value: number, tags?: Record<string, string>, context?: ICorrelationContext): void;
  recordGauge(name: string, value: number, tags?: Record<string, string>, context?: ICorrelationContext): void;
  recordHistogram(name: string, value: number, tags?: Record<string, string>, context?: ICorrelationContext): void;
}
