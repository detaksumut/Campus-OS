import { IdentityContext } from '@campus-os/identity/src/contracts';
import { IProgressionProvider } from '../../contracts/IProgressionProvider';
import { GraduationEligibilityService } from '../domain/services/GraduationEligibilityService';
import { YudisiumService } from '../domain/services/YudisiumService';
import { StudentClearanceRecord } from '../domain/entities/StudentClearanceRecord';
import { AcademicSnapshot } from '../domain/entities/AcademicSnapshot';
import { GraduationEligibilityEvaluation } from '../domain/entities/GraduationEligibilityEvaluation';
import { YudisiumSession } from '../domain/entities/YudisiumSession';
import { GraduationDecisionStatus } from '../domain/entities/GraduationDecisionStatus';
import { DegreeAwardSnapshot } from '../domain/entities/DegreeAwardSnapshot';

export class GraduationApplicationService {
    constructor(
        private readonly progressionProvider: IProgressionProvider,
        private readonly eligibilityService: GraduationEligibilityService,
        private readonly yudisiumService: YudisiumService
    ) {}

    /**
     * Evaluates a student's graduation eligibility.
     * Uses progression provider to build the academic snapshot.
     */
    public async evaluateEligibility(
        context: IdentityContext,
        studentId: string,
        curriculumId: string,
        curriculumVersion: number,
        creditsRequired: number,
        clearanceSnapshots: StudentClearanceRecord[],
        evaluationVersion: number
    ): Promise<GraduationEligibilityEvaluation> {
        this.enforcePermission(context, 'academic.graduation.evaluate');

        const cumulativeResult = await this.progressionProvider.getCumulativeResult(studentId);
        if (!cumulativeResult) {
            throw new Error("Cannot evaluate eligibility without a Cumulative Academic Result.");
        }

        const academicSnapshot = new AcademicSnapshot(
            curriculumId,
            curriculumVersion,
            creditsRequired,
            cumulativeResult.totalCreditsEarned,
            cumulativeResult.ipk,
            1 // Mocked progressionResultVersion for now
        );

        return this.eligibilityService.evaluateEligibility(
            studentId,
            academicSnapshot,
            clearanceSnapshots,
            evaluationVersion
        );
    }

    public createYudisiumSession(context: IdentityContext, termId: string, sessionName: string, scheduledAt: Date): YudisiumSession {
        return this.yudisiumService.createSession(context, termId, sessionName, scheduledAt);
    }

    public openYudisiumSession(context: IdentityContext, session: YudisiumSession): void {
        this.yudisiumService.openSession(context, session);
    }

    public startDeliberation(context: IdentityContext, session: YudisiumSession): void {
        this.yudisiumService.startDeliberation(context, session);
    }

    public recordDecision(
        context: IdentityContext,
        session: YudisiumSession,
        evaluation: GraduationEligibilityEvaluation,
        decisionStatus: GraduationDecisionStatus,
        degreeAward: DegreeAwardSnapshot | null,
        reason: string | null = null
    ): void {
        if (!evaluation.canProceedToYudisium()) {
            throw new Error(`Cannot record an Approved decision for a student whose eligibility is ${evaluation.status}.`);
        }
        
        this.yudisiumService.recordDecision(
            context,
            session,
            evaluation.studentId,
            evaluation.evaluationId,
            decisionStatus,
            degreeAward,
            reason
        );
    }

    public finalizeSession(context: IdentityContext, session: YudisiumSession): void {
        this.yudisiumService.finalizeSession(context, session);
    }

    private enforcePermission(context: IdentityContext, requiredPermission: string): void {
        if (!context.permissions.includes(requiredPermission)) {
            throw new Error(`Forbidden: Missing ${requiredPermission} permission`);
        }
    }
}
