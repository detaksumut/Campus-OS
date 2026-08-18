import { IRegistryProvider, ICapabilityDefinition, IWorkflowDefinition } from './IRegistryProvider';

export class MemoryRegistryProvider implements IRegistryProvider {
  private capabilities = new Map<string, ICapabilityDefinition>();
  private workflows = new Map<string, IWorkflowDefinition>();

  public async registerCapability(capability: ICapabilityDefinition): Promise<void> {
    if (this.capabilities.has(capability.id)) {
      throw new Error(`Capability ${capability.id} is already registered.`);
    }
    this.capabilities.set(capability.id, capability);
  }

  public async getCapability(id: string): Promise<ICapabilityDefinition | undefined> {
    return this.capabilities.get(id);
  }

  public async listCapabilities(): Promise<ICapabilityDefinition[]> {
    return Array.from(this.capabilities.values());
  }

  public async registerWorkflow(workflow: IWorkflowDefinition): Promise<void> {
    if (this.workflows.has(workflow.id)) {
      throw new Error(`Workflow ${workflow.id} is already registered.`);
    }
    this.workflows.set(workflow.id, workflow);
  }

  public async getWorkflow(id: string): Promise<IWorkflowDefinition | undefined> {
    return this.workflows.get(id);
  }
}
