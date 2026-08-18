export enum HealthStatus {
  Unknown = 'Unknown',
  Initializing = 'Initializing',
  Ready = 'Ready',
  Degraded = 'Degraded',
  Unavailable = 'Unavailable',
  Stopping = 'Stopping',
  Stopped = 'Stopped'
}

export interface IServiceLifecycle {
  initialize(): Promise<void>;
  boot(): Promise<void>;
  ready(): Promise<void>;
  shutdown(): Promise<void>;
  dispose(): Promise<void>;
  health(): HealthStatus;
}
