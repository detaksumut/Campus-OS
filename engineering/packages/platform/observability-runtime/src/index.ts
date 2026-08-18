import { IRuntime, IEventBus } from '@campus-os/kernel';
import { HealthRuntime } from './runtime/HealthRuntime';
import { LoggerRuntime } from './runtime/LoggerRuntime';
import { MetricsRuntime } from './runtime/MetricsRuntime';
import { TelemetryRuntime } from './runtime/TelemetryRuntime';
import { TracingRuntime } from './runtime/TracingRuntime';
import { AuditRuntime } from './runtime/AuditRuntime';

export class ObservabilityRuntimeModule implements IRuntime {
  readonly name = 'ObservabilityRuntime';

  constructor(
    public health: HealthRuntime,
    public logger: LoggerRuntime,
    public metrics: MetricsRuntime,
    public telemetry: TelemetryRuntime,
    public tracing: TracingRuntime,
    public audit: AuditRuntime
  ) {}

  async initialize(): Promise<void> {}
  async configure(config: any): Promise<void> {}
  async validate(): Promise<void> {}
  
  async start(): Promise<void> {
    // Initialized in specific order based on EA
  }
  
  async ready(): Promise<void> {}
  async stop(): Promise<void> {}
  async dispose(): Promise<void> {}
}

export * from './contracts';
export * from './runtime/HealthRuntime';
export * from './runtime/LoggerRuntime';
export * from './runtime/MetricsRuntime';
export * from './runtime/TelemetryRuntime';
export * from './runtime/TracingRuntime';
export * from './runtime/AuditRuntime';
