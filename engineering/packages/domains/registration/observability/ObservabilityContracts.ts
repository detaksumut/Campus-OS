export interface CorrelationContext {
  readonly correlationId: string;
  readonly traceId?: string;
  readonly spanId?: string;
  readonly userId?: string;
}

export interface LoggingContract {
  info(message: string, context?: Record<string, any>): void;
  warn(message: string, context?: Record<string, any>): void;
  error(message: string, error?: Error, context?: Record<string, any>): void;
  debug(message: string, context?: Record<string, any>): void;
}

export interface MetricsContract {
  incrementCounter(name: string, tags?: Record<string, string>): void;
  recordHistogram(name: string, value: number, tags?: Record<string, string>): void;
  recordGauge(name: string, value: number, tags?: Record<string, string>): void;
}

export interface TracingContract {
  startSpan(name: string, context?: Record<string, string>): string;
  endSpan(spanId: string, error?: Error): void;
}

export interface HealthCheckContract {
  checkReadiness(): Promise<boolean>;
  checkLiveness(): Promise<boolean>;
}
