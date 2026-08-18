import { IEventBus } from '@campus-os/kernel';
import { IMetricsRuntime, ICorrelationContext } from '../contracts';

export class MetricsRuntime implements IMetricsRuntime {
  constructor(private eventBus: IEventBus) {}

  incrementCounter(name: string, value = 1, ctx?: ICorrelationContext): void {
    this.eventBus.publish('Metrics.Counter', { name, value, correlationId: ctx?.correlationId });
  }

  setGauge(name: string, value: number, ctx?: ICorrelationContext): void {
    this.eventBus.publish('Metrics.Gauge', { name, value, correlationId: ctx?.correlationId });
  }

  recordHistogram(name: string, value: number, ctx?: ICorrelationContext): void {
    this.eventBus.publish('Metrics.Histogram', { name, value, correlationId: ctx?.correlationId });
  }

  startTimer(name: string, ctx?: ICorrelationContext): () => void {
    const start = Date.now();
    return () => {
      const duration = Date.now() - start;
      this.eventBus.publish('Metrics.Timer', { name, duration, correlationId: ctx?.correlationId });
    };
  }
}
