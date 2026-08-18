import { AcademicStanding } from '../domain/entities/AcademicStanding';
import { CumulativeAcademicResult } from '../domain/entities/CumulativeAcademicResult';

export interface IProgressionProvider {
    /**
     * Retrieve the cumulative IPK and standing of a student.
     * This is crucial for Phase 9 (Graduation) to determine eligibility.
     */
    getCumulativeResult(studentId: string): Promise<CumulativeAcademicResult | null>;

    /**
     * Retrieve the official academic standing.
     */
    getAcademicStanding(studentId: string): Promise<AcademicStanding>;
}
