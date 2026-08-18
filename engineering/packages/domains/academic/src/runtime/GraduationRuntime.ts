import { IdentityContext } from '@campus-os/identity/src/contracts';
import { GraduationApplicationService } from './services/GraduationApplicationService';
import { StudentClearanceRecord } from '../domain/entities/StudentClearanceRecord';
import { GraduationEligibilityEvaluation } from '../domain/entities/GraduationEligibilityEvaluation';
import { YudisiumSession } from '../domain/entities/YudisiumSession';
import { GraduationDecisionStatus } from '../domain/entities/GraduationDecisionStatus';
import { DegreeAwardSnapshot } from '../domain/entities/DegreeAwardSnapshot';

export class GraduationRuntime {
    constructor(private readonly graduationService: GraduationApplicationService) {}

    public async evaluateEligibility(
        context: IdentityContext,
        studentId: string,
        curriculumId: string,
        curriculumVersion: number,
        creditsRequired: number,
        clearanceSnapshots: StudentClearanceRecord[],
        evaluationVersion: number
    ): Promise<GraduationEligibilityEvaluation> {
        return this.graduationService.evaluateEligibility(
            context,
            studentId,
            curriculumId,
            curriculumVersion,
            creditsRequired,
            clearanceSnapshots,
            evaluationVersion
        );
    }

    public createYudisiumSession(context: IdentityContext, termId: string, sessionName: string, scheduledAt: Date): YudisiumSession {
        return this.graduationService.createYudisiumSession(context, termId, sessionName, scheduledAt);
    }

    public openYudisiumSession(context: IdentityContext, session: YudisiumSession): void {
        this.graduationService.openYudisiumSession(context, session);
    }

    public startDeliberation(context: IdentityContext, session: YudisiumSession): void {
        this.graduationService.startDeliberation(context, session);
    }

    public recordDecision(
        context: IdentityContext,
        session: YudisiumSession,
        evaluation: GraduationEligibilityEvaluation,
        decisionStatus: GraduationDecisionStatus,
        degreeAward: DegreeAwardSnapshot | null,
        reason: string | null = null
    ): void {
        this.graduationService.recordDecision(context, session, evaluation, decisionStatus, degreeAward, reason);
    }

    public finalizeSession(context: IdentityContext, session: YudisiumSession): void {
        this.graduationService.finalizeSession(context, session);
    }
}
