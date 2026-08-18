import { IEventBus } from '@campus-os/kernel';
import { IEnrollmentRuntime, EnrollmentRequest, IIdentityBindingRuntime } from '../contracts';
import { MembershipEvents } from '../sdk';

export class EnrollmentRuntime implements IEnrollmentRuntime {
  private requests = new Map<string, EnrollmentRequest>();

  constructor(
    private eventBus: IEventBus,
    private identityBinding: IIdentityBindingRuntime
  ) {}

  async requestEnrollment(data: Omit<EnrollmentRequest, 'id' | 'status'>): Promise<string> {
    const id = `req_${Date.now()}`;
    const req: EnrollmentRequest = { ...data, id, status: 'Requested' };
    this.requests.set(id, req);
    
    await this.eventBus.publish(MembershipEvents.EnrollmentRequested, { trackingId: id, email: data.email });
    return id;
  }

  async validateEnrollment(trackingId: string): Promise<void> {
    const req = this.requests.get(trackingId);
    if (!req) throw new Error('Not found');
    req.status = 'Validated';
    await this.eventBus.publish(MembershipEvents.EnrollmentValidated, { trackingId });
  }

  async completeEnrollment(trackingId: string, kernelIdentityId: string): Promise<void> {
    const req = this.requests.get(trackingId);
    if (!req) throw new Error('Not found');
    
    const membershipId = `mem_${Date.now()}`;
    await this.eventBus.publish(MembershipEvents.Created, { membershipId, email: req.email });
    
    await this.identityBinding.bindIdentity(kernelIdentityId, membershipId);
    
    req.status = 'Completed';
  }
}
