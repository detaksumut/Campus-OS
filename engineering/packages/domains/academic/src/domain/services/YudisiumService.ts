import { IdentityContext } from '@campus-os/identity/src/contracts';
import { YudisiumSession } from '../entities/YudisiumSession';
import { YudisiumSessionStatus } from '../entities/YudisiumSessionStatus';
import { GraduationDecisionStatus } from '../entities/GraduationDecisionStatus';
import { DegreeAwardSnapshot } from '../entities/DegreeAwardSnapshot';

export class YudisiumService {
    public createSession(context: IdentityContext, termId: string, sessionName: string, scheduledAt: Date): YudisiumSession {
        this.enforcePermission(context, 'academic.yudisium.manage');
        return new YudisiumSession(
            `YUD-${crypto.randomUUID()}`,
            termId,
            sessionName,
            scheduledAt,
            YudisiumSessionStatus.Draft
        );
    }

    public openSession(context: IdentityContext, session: YudisiumSession): void {
        this.enforcePermission(context, 'academic.yudisium.manage');
        session.openSession();
    }

    public startDeliberation(context: IdentityContext, session: YudisiumSession): void {
        this.enforcePermission(context, 'academic.yudisium.manage');
        session.startDeliberation();
    }

    public recordDecision(
        context: IdentityContext,
        session: YudisiumSession,
        studentId: string,
        eligibilityEvaluationId: string,
        decisionStatus: GraduationDecisionStatus,
        degreeAward: DegreeAwardSnapshot | null,
        reason: string | null = null
    ): void {
        this.enforcePermission(context, 'academic.yudisium.decide');
        
        if (decisionStatus === GraduationDecisionStatus.Approved && !degreeAward) {
            throw new Error("Approved decisions must include a Degree Award Snapshot.");
        }

        session.recordDecision(
            `DEC-${crypto.randomUUID()}`,
            studentId,
            eligibilityEvaluationId,
            decisionStatus,
            degreeAward,
            context.userId,
            reason
        );
    }

    public finalizeSession(context: IdentityContext, session: YudisiumSession): void {
        this.enforcePermission(context, 'academic.yudisium.finalize');
        session.finalizeSession();
    }

    private enforcePermission(context: IdentityContext, requiredPermission: string): void {
        if (!context.permissions.includes(requiredPermission)) {
            throw new Error(`Forbidden: Missing ${requiredPermission} permission`);
        }
    }
}
