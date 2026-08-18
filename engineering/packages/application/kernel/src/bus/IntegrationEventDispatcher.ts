// This assumes we will pull EventEnvelope from @campus-os/events
import { EventEnvelope } from '@campus-os/events';

export interface IIntegrationEventHandler<TEventPayload> {
  handle(event: EventEnvelope<TEventPayload>): Promise<void>;
}

export class IntegrationEventDispatcher {
  private subscribers = new Map<string, IIntegrationEventHandler<any>[]>();

  public subscribe(eventType: string, handler: IIntegrationEventHandler<any>): void {
    const handlers = this.subscribers.get(eventType) || [];
    handlers.push(handler);
    this.subscribers.set(eventType, handlers);
  }

  public async dispatch(event: EventEnvelope<any>): Promise<void> {
    const handlers = this.subscribers.get(event.type);
    if (!handlers || handlers.length === 0) {
      console.warn(`No integration subscribers for event: ${event.type}`);
      return;
    }

    const promises = handlers.map(handler => handler.handle(event).catch(error => {
      console.error(`[IntegrationEventDispatcher] Error handling ${event.type} in handler ${handler.constructor.name}:`, error);
    }));

    await Promise.all(promises);
  }
}
