import { FinalizedCourseResult } from '../entities/FinalizedCourseResult';

export interface IRepeatCoursePolicy {
    /**
     * Resolves which version of a repeated course should be included in the cumulative GPA calculation.
     * Examples: 'HighestGrade', 'LatestAttempt', 'AllAttempts'.
     */
    resolveAttempts(allResults: FinalizedCourseResult[]): FinalizedCourseResult[];
}
