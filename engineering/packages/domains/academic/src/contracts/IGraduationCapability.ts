import { IdentityContext } from '@campus-os/identity/src/contracts';

export interface IGraduationCapability {
    /**
     * Re-evaluates graduation eligibility for a student.
     */
    evaluateEligibility(context: IdentityContext, studentId: string): Promise<string>; // Returns EvaluationId

    /**
     * Creates a new Yudisium session.
     */
    createYudisiumSession(context: IdentityContext, termId: string, sessionName: string, scheduledAt: Date): Promise<string>;

    /**
     * Finalizes a Yudisium session, causing decisions to become immutable and events to be emitted.
     */
    finalizeSession(context: IdentityContext, sessionId: string): Promise<void>;
}
