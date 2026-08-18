import { AsyncLocalStorage } from 'async_hooks';

export interface ContextData {
  identity?: {
    userId: string;
    roles: string[];
  };
  tenant?: string;
  locale?: string;
  timezone?: string;
  permissions?: string[];
  correlationId?: string;
  requestId?: string;
  traceId?: string;
  metadata?: Record<string, any>;
}

export class ApplicationContext {
  private static storage = new AsyncLocalStorage<ContextData>();

  public static run<T>(contextData: ContextData, callback: () => T): T {
    return this.storage.run(contextData, callback);
  }

  public static get current(): ContextData | undefined {
    return this.storage.getStore();
  }

  public static get correlationId(): string | undefined {
    return this.storage.getStore()?.correlationId;
  }

  public static get identity(): ContextData['identity'] | undefined {
    return this.storage.getStore()?.identity;
  }
}
