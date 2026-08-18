import { IEventBus } from '@campus-os/kernel';
import { IHealthRuntime } from '../contracts';

export class HealthRuntime implements IHealthRuntime {
  private checks = new Map<string, () => Promise<boolean>>();

  constructor(private eventBus: IEventBus) {}

  register(id: string, checkFn: () => Promise<boolean>): void {
    this.checks.set(id, checkFn);
  }

  unregister(id: string): void {
    this.checks.delete(id);
  }

  async check(id: string): Promise<boolean> {
    const fn = this.checks.get(id);
    if (!fn) return false;
    const isHealthy = await fn();
    if (!isHealthy) {
      await this.eventBus.publish('Health.Degraded', { id });
    }
    return isHealthy;
  }

  async checkAll(): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {};
    for (const [id] of this.checks) {
      results[id] = await this.check(id);
    }
    return results;
  }
}
