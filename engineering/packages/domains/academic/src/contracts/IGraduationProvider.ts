import { GraduationDecision } from '../domain/entities/GraduationDecision';
import { YudisiumSession } from '../domain/entities/YudisiumSession';

export interface IGraduationProvider {
    /**
     * Get the final graduation decision for a student, if one exists and the session is finalized.
     * This is useful for Alumni or Certification modules to verify degree details.
     */
    getFinalizedDecision(studentId: string): Promise<GraduationDecision | null>;

    /**
     * Get details of a specific Yudisium Session.
     */
    getYudisiumSession(sessionId: string): Promise<YudisiumSession | null>;
}
