import { IEventBus } from '@campus-os/kernel';
import { ITelemetryRuntime, TelemetryType, ICorrelationContext } from '../contracts';

export class TelemetryRuntime implements ITelemetryRuntime {
  constructor(private eventBus: IEventBus) {}

  trackEvent(type: TelemetryType, eventName: string, properties?: any, ctx?: ICorrelationContext): void {
    this.eventBus.publish('Telemetry.Tracked', { type, eventName, properties, correlationId: ctx?.correlationId });
  }
}
