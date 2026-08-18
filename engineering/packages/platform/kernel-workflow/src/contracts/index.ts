export interface StartWorkflowCommand {
  workflowId: string;
  initialState: any;
}

export interface CompleteWorkflowTaskCommand {
  taskId: string;
  output: any;
}

export interface IWorkflowEngine {
  start(command: StartWorkflowCommand): Promise<string>; // Returns executionId
  completeTask(command: CompleteWorkflowTaskCommand): Promise<void>;
}
