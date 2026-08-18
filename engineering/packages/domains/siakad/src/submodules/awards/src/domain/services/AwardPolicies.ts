import { AwardProgram } from '../entities/AwardProgram';
import { AwardStatus } from '../types/AwardsEnums';

export class AwardGovernancePolicy {
  /**
   * Enforces rules for transitioning to the DECIDED status.
   */
  static canFinalizeDecisions(program: AwardProgram): boolean {
    if (program.currentStatus !== AwardStatus.EVALUATION_PHASE) return false;
    // Governance rule: There must be at least one decision made before finalizing
    return program.allDecisions.length > 0;
  }
}

export class AwardEligibilityPolicy {
  /**
   * Checks if a nomination structure is valid against the program's rules.
   */
  static isNominationEligible(program: AwardProgram, nominatorId: string, nomineeId: string): boolean {
    if (!program.canSelfNominate && nominatorId === nomineeId) {
      return false; // Self-nomination blocked by program configuration
    }
    
    // Prevent duplicate nominations for the same nominee in the same program
    const alreadyNominated = program.allNominations.some(n => n.nominee === nomineeId);
    if (alreadyNominated) {
      return false;
    }

    return true;
  }
}
