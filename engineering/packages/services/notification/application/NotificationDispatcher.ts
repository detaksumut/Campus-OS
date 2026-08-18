import { RenderedMessage, IChannelAdapter } from '../contracts/INotificationService';

export class RetryPolicy {
  constructor(private maxRetries: number = 3) {}

  async execute(task: () => Promise<boolean>): Promise<boolean> {
    for (let i = 0; i < this.maxRetries; i++) {
      try {
        const success = await task();
        if (success) return true;
      } catch (err) {
        console.warn(`[RetryPolicy] Attempt ${i + 1} failed. Retrying...`);
      }
    }
    return false;
  }
}

export class NotificationDispatcher {
  private retryPolicy = new RetryPolicy(3);
  // Simulating a Dead Letter Queue push
  private dlq: any[] = [];

  constructor(private adapters: Record<string, IChannelAdapter>) {}

  async dispatch(message: RenderedMessage, recipient: string, channel: string): Promise<void> {
    const adapter = this.adapters[channel];
    if (!adapter) throw new Error(`No adapter found for channel: ${channel}`);

    const success = await this.retryPolicy.execute(() => adapter.send(message, recipient));
    
    if (!success) {
      console.error(`[NotificationDispatcher] Exhausted retries for ${recipient}. Pushing to DLQ.`);
      this.dlq.push({ message, recipient, channel, failedAt: new Date().toISOString() });
    }
  }

  getDlqLength(): number {
    return this.dlq.length;
  }
}
