import { IRegistryProvider, ICapabilityDefinition, IWorkflowDefinition } from './IRegistryProvider';

export class RegistryRuntime {
  constructor(private provider: IRegistryProvider) {}

  public async resolveCapability(id: string): Promise<ICapabilityDefinition> {
    const capability = await this.provider.getCapability(id);
    if (!capability) {
      throw new Error(`Capability not found: ${id}`);
    }
    return capability;
  }

  public async registerCapability(definition: ICapabilityDefinition): Promise<void> {
    await this.provider.registerCapability(definition);
  }

  public async resolveWorkflow(id: string): Promise<IWorkflowDefinition> {
    const workflow = await this.provider.getWorkflow(id);
    if (!workflow) {
      throw new Error(`Workflow not found: ${id}`);
    }
    return workflow;
  }

  public async registerWorkflow(definition: IWorkflowDefinition): Promise<void> {
    await this.provider.registerWorkflow(definition);
  }

  // Future: APIs, Forms, Dashboards, Permissions registration...
}
