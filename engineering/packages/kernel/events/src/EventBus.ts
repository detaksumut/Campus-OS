export type EventHandler<T = any> = (payload: T) => void | Promise<void>;

export interface IEventBus {
  publish<T>(topic: string, payload: T): Promise<void>;
  subscribe<T>(topic: string, handler: EventHandler<T>): string; // Returns subscription ID
  unsubscribe(subscriptionId: string): void;
  once<T>(topic: string, handler: EventHandler<T>): void;
  hasSubscriber(topic: string): boolean;
}

export class EventBus implements IEventBus {
  private subscriptions = new Map<string, { topic: string; handler: EventHandler }>();
  private subCounter = 0;

  async publish<T>(topic: string, payload: T): Promise<void> {
    const handlers = Array.from(this.subscriptions.values()).filter(sub => sub.topic === topic);
    await Promise.all(handlers.map(sub => sub.handler(payload)));
  }

  subscribe<T>(topic: string, handler: EventHandler<T>): string {
    const id = `sub_${++this.subCounter}`;
    this.subscriptions.set(id, { topic, handler });
    return id;
  }

  unsubscribe(subscriptionId: string): void {
    this.subscriptions.delete(subscriptionId);
  }

  once<T>(topic: string, handler: EventHandler<T>): void {
    const id = this.subscribe<T>(topic, async (payload) => {
      this.unsubscribe(id);
      await handler(payload);
    });
  }

  hasSubscriber(topic: string): boolean {
    return Array.from(this.subscriptions.values()).some(sub => sub.topic === topic);
  }
}
