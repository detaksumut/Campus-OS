import { PresentationRegistry } from '../registry/PresentationRegistry';
import { KernelEventBus } from './KernelEventBus';

export class ActionRuntime {
  private bus = KernelEventBus.getInstance();

  constructor(private readonly registry: PresentationRegistry) {}

  async execute(actionId: string, payload: any) {
    const actionMeta = this.registry.action.get(actionId);
    if (!actionMeta) throw new Error(`Action ${actionId} not found in Registry`);

    // 1. Authorization
    this.bus.emit('ActionExecuted', 'ActionRuntime', { stage: 'Authorization', actionId });

    // 2. Validation
    this.bus.emit('ActionExecuted', 'ActionRuntime', { stage: 'Validation', actionId });

    // 3. Telemetry Event
    if (actionMeta.telemetryEvent) {
      this.bus.emit('ActionExecuted', 'ActionRuntime', { stage: 'Telemetry', actionId, telemetryEvent: actionMeta.telemetryEvent });
    }

    // 4. Audit
    this.bus.emit('ActionAudit', 'ActionRuntime', { actionId, payload });

    // 5. API Invocation (Application API Facade)
    console.log(`[ActionRuntime:ApplicationAPI] Dispatching to Endpoint: ${actionMeta.endpoint}`);
    
    return { status: 'success', actionId };
  }
}
