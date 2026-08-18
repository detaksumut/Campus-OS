import { IdentityContext } from '@campus-os/identity/src/contracts';
import { ProgressionService } from './services/ProgressionService';
import { SemesterAcademicResult } from '../domain/entities/SemesterAcademicResult';
import { CumulativeAcademicResult } from '../domain/entities/CumulativeAcademicResult';
import { FinalizedCourseResult } from '../domain/entities/FinalizedCourseResult';

export class ProgressionRuntime {
    constructor(private readonly progressionService: ProgressionService) {}

    public evaluateTermProgression(
        context: IdentityContext,
        studentId: string,
        termId: string,
        finalizedCourses: FinalizedCourseResult[],
        previousSemesters: SemesterAcademicResult[],
        semesterNumber: number
    ): { termResult: SemesterAcademicResult, cumulativeResult: CumulativeAcademicResult } {
        return this.progressionService.evaluateTermProgression(
            context,
            studentId,
            termId,
            finalizedCourses,
            previousSemesters,
            semesterNumber
        );
    }

    public invalidateProgression(
        context: IdentityContext,
        studentId: string,
        termId: string,
        reason: string
    ): void {
        this.progressionService.invalidateProgression(context, studentId, termId, reason);
    }
}
