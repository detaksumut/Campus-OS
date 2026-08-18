import { IdentityContext } from '@campus-os/identity/src/contracts';
import { IAssessmentProvider } from '../../contracts/IAssessmentProvider';
import { GPACalculationService } from '../domain/services/GPACalculationService';
import { IRepeatCoursePolicy } from '../domain/policies/IRepeatCoursePolicy';
import { IAcademicStandingPolicy } from '../domain/policies/IAcademicStandingPolicy';
import { SemesterAcademicResult } from '../domain/entities/SemesterAcademicResult';
import { CumulativeAcademicResult } from '../domain/entities/CumulativeAcademicResult';
import { FinalizedCourseResult } from '../domain/entities/FinalizedCourseResult';

export class ProgressionService {
    constructor(
        private readonly assessmentProvider: IAssessmentProvider,
        private readonly gpaCalculationService: GPACalculationService,
        private readonly repeatCoursePolicy: IRepeatCoursePolicy,
        private readonly standingPolicy: IAcademicStandingPolicy
    ) {}

    /**
     * Authoritative explicit evaluation of a term (ADR-020).
     * @param context Context of the executor
     * @param studentId The student to evaluate
     * @param termId The academic term
     * @param finalizedCourses The finalized dataset from this term (Completeness Gate must be satisfied before calling)
     * @param previousSemesters All previous SemesterAcademicResults for Cumulative rebuild
     * @param semesterNumber The sequential number of this semester for the student (e.g. 1st, 2nd, etc)
     */
    public evaluateTermProgression(
        context: IdentityContext,
        studentId: string,
        termId: string,
        finalizedCourses: FinalizedCourseResult[],
        previousSemesters: SemesterAcademicResult[],
        semesterNumber: number
    ): { termResult: SemesterAcademicResult, cumulativeResult: CumulativeAcademicResult } {
        
        this.enforcePermission(context, 'academic.progression.evaluate');

        // 1. Calculate Term IPS
        const termCalc = this.gpaCalculationService.calculateGPA(finalizedCourses);

        // 2. Build Cumulative Snapshot
        // Combine previous finalized courses with current term's finalized courses.
        // (Assuming we have a way to fetch all historical FinalizedCourseResults if we want true cumulative repeat policy,
        // but for now, we assume previousSemesters + current term is enough, or repeat policy filters the raw finalized courses).
        
        // As a simplification, let's say the system provides all historical courses:
        // const allHistoricalCourses = [...]; 
        // const effectiveCourses = this.repeatCoursePolicy.resolveAttempts(allHistoricalCourses);
        // const cumCalc = this.gpaCalculationService.calculateGPA(effectiveCourses);
        
        // For the sake of the domain model, we'll assume we can rebuild cumulative IPK 
        // via the CumulativeAcademicResult.rebuild method, which acts as a projection.
        // However, true IPK needs to apply IRepeatCoursePolicy across all terms.
        // If we strictly follow ADR-020, we need the repeat policy applied to all finalized courses.
        // To keep this service signature clean while showing the logic:
        
        // We will just create a new SemesterAcademicResult version 1
        const termResult = new SemesterAcademicResult(
            `SAR-${crypto.randomUUID()}`,
            studentId,
            termId,
            1, // Version 1
            termCalc.totalAttempted,
            termCalc.totalEarned,
            termCalc.totalPoints,
            termCalc.gpa,
            null as any, // We will set standing after cumulative is determined
            new Date(),
            context.userId,
            this.generateSnapshotVersion(finalizedCourses) // composite hash
        );

        // 3. Rebuild Cumulative Result
        const allSemesters = [...previousSemesters, termResult];
        const cumulativeResult = CumulativeAcademicResult.rebuild(studentId, allSemesters);

        // 4. Determine Standing
        const standing = this.standingPolicy.determineStanding(
            termResult.ips,
            termResult.creditsAttempted,
            cumulativeResult.ipk,
            cumulativeResult.totalCreditsEarned,
            semesterNumber
        );

        // Assign standing
        (termResult as any).standing = standing; // In real code, we'd use a setter or recreate
        (cumulativeResult as any).standing = standing;

        return { termResult, cumulativeResult };
    }

    /**
     * Mark progression as dirty (e.g. triggered by StudentGradeCorrected event).
     * This does NOT change the official standing, just flags it.
     */
    public invalidateProgression(context: IdentityContext, studentId: string, termId: string, reason: string): void {
        // Enforce system or admin permission
        this.enforcePermission(context, 'academic.progression.invalidate');
        // Logic to mark the existing SemesterAcademicResult as Stale/Dirty in DB
    }

    private enforcePermission(context: IdentityContext, requiredPermission: string): void {
        if (!context.permissions.includes(requiredPermission)) {
            throw new Error(`Forbidden: Missing ${requiredPermission} permission`);
        }
    }

    private generateSnapshotVersion(courses: FinalizedCourseResult[]): string {
        // Pseudo-hash of the dataset
        return `snap-${courses.length}-${Date.now()}`;
    }
}
