export interface RenderedMessage {
  subject: string;
  body: string;
  attachments?: any[];
  metadata?: any;
}

export interface INotificationService {
  send(templateId: string, locale: string, context: any, recipient: string): Promise<void>;
}

export interface IChannelAdapter {
  send(message: RenderedMessage, recipient: string): Promise<boolean>;
}

export interface IProvider {
  deliver(payload: any): Promise<boolean>;
}
