import { AcademicStanding } from './AcademicStanding';

export class SemesterAcademicResult {
    constructor(
        public readonly resultId: string,
        public readonly studentId: string,
        public readonly academicTermId: string,
        public readonly evaluationVersion: number,
        public readonly creditsAttempted: number,
        public readonly creditsEarned: number,
        public readonly totalGradePoints: number,
        public readonly ips: number, // Indeks Prestasi Semester
        public readonly standing: AcademicStanding,
        public readonly evaluatedAt: Date,
        public readonly evaluatedBy: string,
        public readonly sourceSnapshotVersion: string // e.g. composite hash of included finalized courses
    ) {}
}
