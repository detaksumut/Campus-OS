import { IChannelAdapter, IProvider, RenderedMessage } from '../../contracts/INotificationService';

export class SendGridProvider implements IProvider {
  async deliver(payload: any): Promise<boolean> {
    console.log(`[SendGridProvider] Delivering email to ${payload.to}...`);
    // Mock random transient failure to trigger RetryPolicy
    if (Math.random() < 0.3) throw new Error('SendGrid Timeout');
    return true;
  }
}

export class SmtpProvider implements IProvider {
  async deliver(payload: any): Promise<boolean> {
    console.log(`[SmtpProvider] Delivering email via SMTP to ${payload.to}...`);
    return true;
  }
}

export class EmailAdapter implements IChannelAdapter {
  constructor(private provider: IProvider) {}

  async send(message: RenderedMessage, recipient: string): Promise<boolean> {
    return this.provider.deliver({ to: recipient, content: message.body });
  }
}
