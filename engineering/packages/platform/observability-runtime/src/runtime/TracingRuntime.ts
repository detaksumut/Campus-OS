import { IEventBus } from '@campus-os/kernel';
import { ITracingRuntime, ICorrelationContext } from '../contracts';

export class TracingRuntime implements ITracingRuntime {
  constructor(private eventBus: IEventBus) {}

  startSpan(name: string, parentSpanId?: string, ctx?: ICorrelationContext): string {
    const spanId = `span_${Date.now()}`;
    this.eventBus.publish('Tracing.SpanStarted', { name, spanId, parentSpanId, correlationId: ctx?.correlationId });
    return spanId;
  }

  endSpan(spanId: string): void {
    this.eventBus.publish('Tracing.SpanEnded', { spanId });
  }
}
