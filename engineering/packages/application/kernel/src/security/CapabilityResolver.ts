import { RegistryRuntime } from '../registry/RegistryRuntime';
import { ICapabilityDefinition } from '../registry/IRegistryProvider';

export class CapabilityResolver {
  constructor(private registry: RegistryRuntime) {}

  public async resolve(capabilityId: string): Promise<ICapabilityDefinition | undefined> {
    try {
      return await this.registry.resolveCapability(capabilityId);
    } catch {
      return undefined;
    }
  }
}
