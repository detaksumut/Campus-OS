import { IEventBus } from '@campus-os/kernel';
import { IIdentityBindingRuntime, IIdentityBinding } from '../contracts';
import { MembershipEvents } from '../sdk';

export class IdentityBindingRuntime implements IIdentityBindingRuntime {
  private bindings = new Map<string, IIdentityBinding>(); // Mock DB

  constructor(private eventBus: IEventBus) {}

  async bindIdentity(kernelIdentityId: string, membershipId: string): Promise<void> {
    const binding = { kernelIdentityId, membershipId, boundAt: Date.now() };
    this.bindings.set(kernelIdentityId, binding);
    await this.eventBus.publish(MembershipEvents.IdentityBound, binding);
  }

  async unbindIdentity(kernelIdentityId: string): Promise<void> {
    this.bindings.delete(kernelIdentityId);
  }

  async getBinding(kernelIdentityId: string): Promise<IIdentityBinding | null> {
    return this.bindings.get(kernelIdentityId) || null;
  }

  async hasBinding(kernelIdentityId: string): Promise<boolean> {
    return this.bindings.has(kernelIdentityId);
  }
}
