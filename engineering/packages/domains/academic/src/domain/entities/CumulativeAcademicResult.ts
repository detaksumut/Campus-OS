import { AcademicStanding } from './AcademicStanding';
import { SemesterAcademicResult } from './SemesterAcademicResult';

export class CumulativeAcademicResult {
    constructor(
        public readonly studentId: string,
        public readonly totalCreditsAttempted: number,
        public readonly totalCreditsEarned: number,
        public readonly cumulativeGradePoints: number,
        public readonly ipk: number, // Indeks Prestasi Kumulatif
        public readonly standing: AcademicStanding, // Usually the latest term's standing
        public readonly lastEvaluatedAt: Date,
        public readonly semestersIncluded: string[] // List of SemesterAcademicResult ResultIds
    ) {}

    // Cumulative Result is a projection that should be rebuildable from SemesterAcademicResults
    public static rebuild(studentId: string, semesters: SemesterAcademicResult[]): CumulativeAcademicResult {
        let totalAttempted = 0;
        let totalEarned = 0;
        let totalPoints = 0;
        const includedIds: string[] = [];

        // Simple sum - assumes IRepeatCoursePolicy has already filtered the source 'semesters' or 
        // the FinalizedCourseResult items that fed into them were already deduped.
        // Actually, retake policy usually applies across terms. So rebuilding cumulative GPA 
        // might require looking at the granular FinalizedCourseResults across all terms.
        // For this projection aggregate, we assume the GPACalculationService handles the complex math
        // and provides the final numbers to construct this projection.
        
        // As a simple placeholder, if GPACalculationService provides the final totals:
        semesters.forEach(s => {
            totalAttempted += s.creditsAttempted;
            totalEarned += s.creditsEarned;
            totalPoints += s.totalGradePoints;
            includedIds.push(s.resultId);
        });
        
        let ipk = 0;
        if (totalAttempted > 0) {
            ipk = Math.round((totalPoints / totalAttempted) * 100) / 100;
        }

        // Determine standing based on the latest semester (simplified)
        let latestStanding = AcademicStanding.GoodStanding;
        if (semesters.length > 0) {
            const sorted = [...semesters].sort((a, b) => b.evaluatedAt.getTime() - a.evaluatedAt.getTime());
            latestStanding = sorted[0].standing;
        }

        return new CumulativeAcademicResult(
            studentId,
            totalAttempted,
            totalEarned,
            totalPoints,
            ipk,
            latestStanding,
            new Date(),
            includedIds
        );
    }
}
