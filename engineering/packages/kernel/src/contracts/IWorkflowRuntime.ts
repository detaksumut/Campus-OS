import { IRuntime } from './IRuntime';

export interface IWorkflowRuntime extends IRuntime {
  startSaga(sagaName: string, initialPayload: any): Promise<string>;
  compensate(sagaId: string): Promise<void>;
}
