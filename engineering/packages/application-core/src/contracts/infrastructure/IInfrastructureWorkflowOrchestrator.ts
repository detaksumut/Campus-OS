export interface IInfrastructureWorkflowOrchestrator<TContext, TResult> {
  execute(context: TContext): Promise<TResult>;
  compensate(context: TContext, error: Error): Promise<void>;
  getStatus(workflowId: string): Promise<string>;
}
