export enum LogLevel {
  DEBUG, INFO, WARN, ERROR, FATAL
}

export interface ILogger {
  log(level: LogLevel, message: string, context?: any): void;
  info(message: string, context?: any): void;
  error(message: string, error?: Error, context?: any): void;
}

export interface IMetricsEngine {
  incrementCounter(name: string, labels?: Record<string, string>): void;
  recordHistogram(name: string, value: number, labels?: Record<string, string>): void;
}

export interface ITracer {
  startSpan(name: string): any;
  endSpan(span: any): void;
}
