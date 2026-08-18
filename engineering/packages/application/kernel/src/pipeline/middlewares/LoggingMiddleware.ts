import { IMiddleware, ICommandContext } from '../IMiddleware';

export class LoggingMiddleware implements IMiddleware {
  public async execute(context: ICommandContext, next: () => Promise<any>): Promise<any> {
    const start = Date.now();
    console.log(`[EXEC] Starting command ${context.commandId} | Correlation: ${context.appContext?.correlationId}`);
    
    try {
      const result = await next();
      const duration = Date.now() - start;
      console.log(`[EXEC] Completed command ${context.commandId} in ${duration}ms`);
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      console.error(`[EXEC] Failed command ${context.commandId} after ${duration}ms:`, error);
      throw error;
    }
  }
}
