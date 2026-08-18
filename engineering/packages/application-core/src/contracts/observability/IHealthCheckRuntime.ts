export type ComponentStatus = 'HEALTHY' | 'DEGRADED' | 'UNHEALTHY';

export interface ComponentHealth {
  name: string;
  status: ComponentStatus;
  latencyMs: number;
  message?: string;
}

export interface SystemHealthReport {
  overallStatus: ComponentStatus;
  timestamp: string;
  components: ComponentHealth[];
}

export interface IHealthCheckRuntime {
  checkAll(): Promise<SystemHealthReport>;
}
