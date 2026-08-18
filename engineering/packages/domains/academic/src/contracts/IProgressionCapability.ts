import { IdentityContext } from '@campus-os/identity/src/contracts';

export interface IProgressionCapability {
    /**
     * Authoritative calculation of term progression.
     * Rebuilds cumulative result based on this term's finalized courses.
     */
    evaluateTermProgression(
        context: IdentityContext, 
        studentId: string, 
        termId: string
    ): Promise<void>;

    /**
     * Marks a progression result as dirty/stale (e.g., due to a grade correction).
     * This does NOT change the official standing, just flags it for reevaluation.
     */
    invalidateProgression(
        context: IdentityContext, 
        studentId: string, 
        termId: string, 
        reason: string
    ): Promise<void>;
}
