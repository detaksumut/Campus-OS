import { AcademicStanding } from '../entities/AcademicStanding';

export interface IAcademicStandingPolicy {
    /**
     * Determines the academic standing for a specific term based on term stats and cumulative stats.
     */
    determineStanding(
        termIps: number,
        termCreditsAttempted: number,
        cumulativeIpk: number,
        cumulativeCreditsEarned: number,
        semesterNumber: number
    ): AcademicStanding;
}
