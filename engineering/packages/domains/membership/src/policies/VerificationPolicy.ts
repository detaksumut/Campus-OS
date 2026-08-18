import { VerificationState, IVerificationPolicy } from '../contracts';

export class VerificationPolicy implements IVerificationPolicy {
  async canTransition(membershipId: string, fromState: VerificationState, toState: VerificationState): Promise<boolean> {
    // Basic Transition Table Matrix rules
    const allowedTransitions: Record<VerificationState, VerificationState[]> = {
      'Pending': ['Submitted'],
      'Submitted': ['UnderReview'],
      'UnderReview': ['Verified', 'Rejected'],
      'Verified': ['Suspended'],
      'Rejected': ['Submitted'],
      'Suspended': ['Verified']
    };

    if (!allowedTransitions[fromState]?.includes(toState)) {
      return false;
    }

    // Advanced Business Policies could be evaluated here (e.g., checking if docs exist)
    return true;
  }
}
