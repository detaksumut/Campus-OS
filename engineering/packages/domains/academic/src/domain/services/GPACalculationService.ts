import { FinalizedCourseResult } from '../entities/FinalizedCourseResult';

export class GPACalculationService {
    /**
     * Deterministic calculation for GPA based on finalized courses.
     * Math: Sum(Credits * GradePoint) / Sum(CreditsAttempted)
     * Rounds to 2 decimal places.
     */
    public calculateGPA(results: FinalizedCourseResult[]): { 
        gpa: number, 
        totalAttempted: number, 
        totalEarned: number, 
        totalPoints: number 
    } {
        let totalAttempted = 0;
        let totalEarned = 0;
        let totalPoints = 0;

        for (const result of results) {
            // Include in total attempted
            totalAttempted += result.creditsAttempted;
            
            // Only add earned credits if passed
            if (result.passStatus) {
                totalEarned += result.creditsEarned;
            }

            // Points calculation maintains precision before division
            totalPoints += (result.creditsAttempted * result.gradePoint);
        }

        let gpa = 0;
        if (totalAttempted > 0) {
            // Division then rounding to 2 decimal places
            gpa = Math.round((totalPoints / totalAttempted) * 100) / 100;
        }

        return {
            gpa,
            totalAttempted,
            totalEarned,
            totalPoints
        };
    }
}
