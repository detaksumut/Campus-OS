export interface ICorrelationContext {
  correlationId: string;
}

export interface IHealthRuntime {
  register(id: string, checkFn: () => Promise<boolean>): void;
  unregister(id: string): void;
  check(id: string): Promise<boolean>;
  checkAll(): Promise<Record<string, boolean>>;
}

export type LogChannel = 'system' | 'runtime' | 'security' | 'audit' | 'application';

export interface ILoggerRuntime {
  trace(channel: LogChannel, msg: string, ctx?: ICorrelationContext): void;
  debug(channel: LogChannel, msg: string, ctx?: ICorrelationContext): void;
  info(channel: LogChannel, msg: string, ctx?: ICorrelationContext): void;
  warn(channel: LogChannel, msg: string, ctx?: ICorrelationContext): void;
  error(channel: LogChannel, msg: string, ctx?: ICorrelationContext): void;
  fatal(channel: LogChannel, msg: string, ctx?: ICorrelationContext): void;
}

export interface IMetricsRuntime {
  incrementCounter(name: string, value?: number, ctx?: ICorrelationContext): void;
  setGauge(name: string, value: number, ctx?: ICorrelationContext): void;
  recordHistogram(name: string, value: number, ctx?: ICorrelationContext): void;
  startTimer(name: string, ctx?: ICorrelationContext): () => void;
}

export type TelemetryType = 'SystemEvent' | 'UserEvent';

export interface ITelemetryRuntime {
  trackEvent(type: TelemetryType, eventName: string, properties?: any, ctx?: ICorrelationContext): void;
}

export interface ITracingRuntime {
  startSpan(name: string, parentSpanId?: string, ctx?: ICorrelationContext): string; // returns spanId
  endSpan(spanId: string): void;
}

export interface AuditRecord {
  actor: string;
  action: string;
  resource: string;
  timestamp: number;
  tenant: string;
  correlationId: string;
  metadata?: any;
}

export interface IAuditRuntime {
  record(audit: AuditRecord): void;
}
