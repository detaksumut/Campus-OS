import { INotificationService } from '../contracts/INotificationService';
import { IServiceLifecycle, HealthStatus } from '../../../services/runtime/src/contracts/IServiceLifecycle';
import { TemplateRenderer } from '../application/TemplateEngine';
import { NotificationDispatcher } from '../application/NotificationDispatcher';
import { EmailAdapter, SendGridProvider } from '../infrastructure/adapters/EmailAdapter';

export class NotificationServiceProvider implements INotificationService, IServiceLifecycle {
  private renderer = new TemplateRenderer();
  private dispatcher: NotificationDispatcher;
  private _health = HealthStatus.Unknown;

  constructor() {
    const sendGrid = new SendGridProvider();
    const emailAdapter = new EmailAdapter(sendGrid);
    this.dispatcher = new NotificationDispatcher({ 'email': emailAdapter });
  }

  async initialize(): Promise<void> { this._health = HealthStatus.Initializing; }
  async boot(): Promise<void> { }
  async ready(): Promise<void> { this._health = HealthStatus.Ready; }
  async shutdown(): Promise<void> { this._health = HealthStatus.Stopped; }
  async dispose(): Promise<void> { }
  health(): HealthStatus { return this._health; }

  async send(templateId: string, locale: string, context: any, recipient: string): Promise<void> {
    console.log(`[NotificationService] Processing template: ${templateId}`);
    const message = this.renderer.render(templateId, locale, context);
    // Hardcoding channel 'email' for this mock implementation
    await this.dispatcher.dispatch(message, recipient, 'email');
  }
}
