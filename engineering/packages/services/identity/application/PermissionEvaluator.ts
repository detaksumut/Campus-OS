import { IPermissionEvaluator } from '../contracts/IIdentityService';
import { CapabilityRegistry } from '../registry/CapabilityRegistry';

export class PermissionEvaluator implements IPermissionEvaluator {
  private registry = new CapabilityRegistry();

  async hasPermission(userId: string, capability: string): Promise<boolean> {
    if (!this.registry.isValidCapability(capability)) {
      throw new Error(`Capability [${capability}] is not registered in CapabilityModel.json.`);
    }

    console.log(`[IdentityService] Evaluating registered permission [${capability}] for user [${userId}]...`);
    // Mock capability resolution
    if (userId === 'usr-1') return true; // Admin has all
    return false;
  }
}
