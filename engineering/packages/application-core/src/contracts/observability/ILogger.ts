import { ICorrelationContext } from './ICorrelationContext';

export interface ILogger {
  trace(message: string, context?: ICorrelationContext, meta?: any): void;
  debug(message: string, context?: ICorrelationContext, meta?: any): void;
  info(message: string, context?: ICorrelationContext, meta?: any): void;
  warn(message: string, context?: ICorrelationContext, meta?: any): void;
  error(message: string, error?: Error, context?: ICorrelationContext, meta?: any): void;
  fatal(message: string, error?: Error, context?: ICorrelationContext, meta?: any): void;
}
