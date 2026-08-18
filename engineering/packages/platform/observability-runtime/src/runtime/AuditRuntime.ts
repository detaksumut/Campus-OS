import { IEventBus } from '@campus-os/kernel';
import { IAuditRuntime, AuditRecord } from '../contracts';

export class AuditRuntime implements IAuditRuntime {
  constructor(private eventBus: IEventBus) {}

  record(audit: AuditRecord): void {
    // Highly secure compliance log via EventBus
    this.eventBus.publish('Audit.Recorded', audit);
  }
}
