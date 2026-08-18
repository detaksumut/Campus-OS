import { SDKContext } from '../context/SDKContext';
import { IWorkflowRuntime } from '../../../kernel/src/contracts/IWorkflowRuntime';

/**
 * Orchestrates multi-step Sagas and distributed transactions.
 * 
 * @public
 * @stable
 */
export class Workflow {
  private static get runtime(): IWorkflowRuntime {
    return SDKContext.getRuntime<IWorkflowRuntime>('WorkflowRuntime');
  }

  /**
   * Starts a new Saga workflow.
   * 
   * @stable
   */
  static async start(sagaName: string, initialPayload: any): Promise<string> {
    return this.runtime.startSaga(sagaName, initialPayload);
  }

  /**
   * Triggers compensation (rollback) for a failed Saga.
   * 
   * @stable
   */
  static async compensate(sagaId: string): Promise<void> {
    return this.runtime.compensate(sagaId);
  }
}
