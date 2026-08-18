import { IEventBus } from '@campus-os/kernel';
import { ILoggerRuntime, LogChannel, ICorrelationContext } from '../contracts';

export class LoggerRuntime implements ILoggerRuntime {
  constructor(private eventBus: IEventBus) {}

  private async log(level: string, channel: LogChannel, msg: string, ctx?: ICorrelationContext) {
    await this.eventBus.publish('Logger.Logged', { level, channel, msg, correlationId: ctx?.correlationId });
  }

  trace(c: LogChannel, m: string, ctx?: ICorrelationContext) { this.log('TRACE', c, m, ctx); }
  debug(c: LogChannel, m: string, ctx?: ICorrelationContext) { this.log('DEBUG', c, m, ctx); }
  info(c: LogChannel, m: string, ctx?: ICorrelationContext) { this.log('INFO', c, m, ctx); }
  warn(c: LogChannel, m: string, ctx?: ICorrelationContext) { this.log('WARN', c, m, ctx); }
  error(c: LogChannel, m: string, ctx?: ICorrelationContext) { this.log('ERROR', c, m, ctx); }
  fatal(c: LogChannel, m: string, ctx?: ICorrelationContext) { this.log('FATAL', c, m, ctx); }
}
