import { NotImplementedError } from '../errors/SDKErrors';

/**
 * File and blob storage façade.
 * 
 * @public
 * @experimental
 */
export class Storage {
  /** @experimental */
  static async save(path: string, buffer: any): Promise<void> {
    throw new NotImplementedError('Storage');
  }
}

/**
 * Document generation façade.
 * 
 * @public
 * @experimental
 */
export class Document {
  /** @experimental */
  static async generate(templateId: string, data: any): Promise<Buffer> {
    throw new NotImplementedError('Document');
  }
}

/**
 * Push, Email, and SMS notification façade.
 * 
 * @public
 * @experimental
 */
export class Notification {
  /** @experimental */
  static async send(userId: string, message: string): Promise<void> {
    throw new NotImplementedError('Notification');
  }
}
