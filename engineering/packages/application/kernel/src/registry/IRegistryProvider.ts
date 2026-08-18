export interface ICapabilityDefinition {
  id: string; // e.g. "capability.membership.enroll"
  name: string;
  description?: string;
  requiredPermissions?: string[];
  inputSchema?: any; // JSON Schema
}

export interface IWorkflowDefinition {
  id: string;
  name: string;
  steps: string[]; // Simplistic for now
}

export interface IRegistryProvider {
  registerCapability(capability: ICapabilityDefinition): Promise<void>;
  getCapability(id: string): Promise<ICapabilityDefinition | undefined>;
  listCapabilities(): Promise<ICapabilityDefinition[]>;

  registerWorkflow(workflow: IWorkflowDefinition): Promise<void>;
  getWorkflow(id: string): Promise<IWorkflowDefinition | undefined>;
}
