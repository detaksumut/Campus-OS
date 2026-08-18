import { IEventBus } from '@campus-os/kernel';
import { IVerificationRuntime, VerificationState, IVerificationPolicy } from '../contracts';
import { MembershipWorkflowEvents } from '../sdk';

export class VerificationRuntime implements IVerificationRuntime {
  private states = new Map<string, VerificationState>();
  private histories = new Map<string, { state: VerificationState; timestamp: number }[]>();

  constructor(private eventBus: IEventBus, private policy: IVerificationPolicy) {}

  async getVerificationState(membershipId: string): Promise<VerificationState> {
    return this.states.get(membershipId) || 'Pending';
  }

  async isVerified(membershipId: string): Promise<boolean> {
    return (await this.getVerificationState(membershipId)) === 'Verified';
  }

  async getVerificationHistory(membershipId: string): Promise<{ state: VerificationState; timestamp: number }[]> {
    return this.histories.get(membershipId) || [];
  }

  private async transition(membershipId: string, toState: VerificationState, eventName: MembershipWorkflowEvents): Promise<void> {
    const fromState = await this.getVerificationState(membershipId);
    
    if (fromState === toState && fromState === 'Pending') {
      // First initialization exception
    } else {
      const allowed = await this.policy.canTransition(membershipId, fromState, toState);
      if (!allowed) {
        throw new Error(`Invalid transition from ${fromState} to ${toState}`);
      }
    }

    this.states.set(membershipId, toState);
    const history = this.histories.get(membershipId) || [];
    history.push({ state: toState, timestamp: Date.now() });
    this.histories.set(membershipId, history);

    await this.eventBus.publish(eventName, { membershipId, state: toState });
  }

  async requestVerification(membershipId: string): Promise<void> {
    // Forces state tracking to begin if not already pending
    this.states.set(membershipId, 'Pending');
    await this.transition(membershipId, 'Submitted', MembershipWorkflowEvents.VerificationRequested);
  }

  async submitDocuments(membershipId: string, documentIds: string[]): Promise<void> {
    await this.transition(membershipId, 'Submitted', MembershipWorkflowEvents.Submitted);
  }

  async startReview(membershipId: string): Promise<void> {
    await this.transition(membershipId, 'UnderReview', MembershipWorkflowEvents.UnderReview);
  }

  async approve(membershipId: string): Promise<void> {
    await this.transition(membershipId, 'Verified', MembershipWorkflowEvents.Verified);
  }

  async reject(membershipId: string, reason: string): Promise<void> {
    await this.transition(membershipId, 'Rejected', MembershipWorkflowEvents.Rejected);
  }

  async suspend(membershipId: string, reason: string): Promise<void> {
    await this.transition(membershipId, 'Suspended', MembershipWorkflowEvents.Suspended);
  }
}
