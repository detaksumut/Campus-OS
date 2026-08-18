import { IHealthCheckRuntime, SystemHealthReport, ComponentHealth } from '@campus-os/application-core/src/contracts/observability/IHealthCheckRuntime';

export class SystemHealthCheckAdapter implements IHealthCheckRuntime {
  public async checkAll(): Promise<SystemHealthReport> {
    const components: ComponentHealth[] = [
      { name: 'Database', status: 'HEALTHY', latencyMs: 12 },
      { name: 'Redis', status: 'HEALTHY', latencyMs: 3 },
      { name: 'Storage', status: 'HEALTHY', latencyMs: 45 },
      { name: 'Zenodo', status: 'HEALTHY', latencyMs: 210 },
      { name: 'OpenAIRE', status: 'HEALTHY', latencyMs: 150 },
      { name: 'Arjuna', status: 'DEGRADED', latencyMs: 800, message: 'High latency detected' },
      { name: 'SMTP', status: 'HEALTHY', latencyMs: 35 },
      { name: 'Scheduler', status: 'HEALTHY', latencyMs: 2 }
    ];

    const isUnhealthy = components.some(c => c.status === 'UNHEALTHY');
    const isDegraded = components.some(c => c.status === 'DEGRADED');
    
    let overallStatus: 'HEALTHY' | 'DEGRADED' | 'UNHEALTHY' = 'HEALTHY';
    if (isUnhealthy) overallStatus = 'UNHEALTHY';
    else if (isDegraded) overallStatus = 'DEGRADED';

    return {
      overallStatus,
      timestamp: new Date().toISOString(),
      components
    };
  }
}
