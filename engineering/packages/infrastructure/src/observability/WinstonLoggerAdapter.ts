import { ILogger } from '@campus-os/application-core/src/contracts/observability/ILogger';
import { ICorrelationContext } from '@campus-os/application-core/src/contracts/observability/ICorrelationContext';

export class WinstonLoggerAdapter implements ILogger {
  private formatMessage(level: string, message: string, context?: ICorrelationContext, meta?: any): string {
    const traceStr = context ? `[TraceID:${context.traceId}] [Actor:${context.actorId || 'System'}]` : '[NoContext]';
    return `${new Date().toISOString()} | ${level.padEnd(5)} | ${traceStr} | ${message}`;
  }

  trace(message: string, context?: ICorrelationContext, meta?: any): void { console.log(this.formatMessage('TRACE', message, context, meta)); }
  debug(message: string, context?: ICorrelationContext, meta?: any): void { console.log(this.formatMessage('DEBUG', message, context, meta)); }
  info(message: string, context?: ICorrelationContext, meta?: any): void { console.info(this.formatMessage('INFO', message, context, meta)); }
  warn(message: string, context?: ICorrelationContext, meta?: any): void { console.warn(this.formatMessage('WARN', message, context, meta)); }
  error(message: string, error?: Error, context?: ICorrelationContext, meta?: any): void { console.error(this.formatMessage('ERROR', message, context, meta), error); }
  fatal(message: string, error?: Error, context?: ICorrelationContext, meta?: any): void { console.error(this.formatMessage('FATAL', message, context, meta), error); }
}
