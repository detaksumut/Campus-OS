import { SDKContext } from '../context/SDKContext';
import { ILoggerFacade } from '../contracts/ILoggerFacade';
import { IObservabilityRuntime } from '../../../kernel/src/contracts/IObservabilityRuntime';

/**
 * Unified gateway for structured logging, metrics, and tracing.
 * 
 * @public
 * @stable
 */
export class Logger implements ILoggerFacade {
  private static get runtime(): IObservabilityRuntime {
    return SDKContext.getRuntime<IObservabilityRuntime>('ObservabilityRuntime');
  }

  /** @stable */
  static info(message: string, context?: any): void {
    this.runtime.log('INFO', message, context);
  }

  /** @stable */
  static error(message: string, context?: any): void {
    this.runtime.log('ERROR', message, context);
  }

  /** @stable */
  static warn(message: string, context?: any): void {
    this.runtime.log('WARN', message, context);
  }

  /** @stable */
  static debug(message: string, context?: any): void {
    this.runtime.log('DEBUG', message, context);
  }

  info(message: string, context?: any): void { Logger.info(message, context); }
  error(message: string, context?: any): void { Logger.error(message, context); }
  warn(message: string, context?: any): void { Logger.warn(message, context); }
  debug(message: string, context?: any): void { Logger.debug(message, context); }
}
