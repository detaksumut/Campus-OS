import { BaseRuntime } from './BaseRuntime';
import { IWorkflowRuntime } from '../contracts/IWorkflowRuntime';

export class WorkflowRuntime extends BaseRuntime implements IWorkflowRuntime {
  constructor() {
    super('WorkflowRuntime');
  }

  async startSaga(sagaName: string, initialPayload: any): Promise<string> {
    const sagaId = `saga-${Date.now()}`;
    console.log(`[${this.name}] Started Saga: ${sagaName} (${sagaId})`);
    return sagaId;
  }

  async compensate(sagaId: string): Promise<void> {
    console.log(`[${this.name}] Compensating Saga: ${sagaId}`);
  }
}
