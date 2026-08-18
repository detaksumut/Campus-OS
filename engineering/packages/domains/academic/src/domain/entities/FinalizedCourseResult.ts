export class FinalizedCourseResult {
    constructor(
        public readonly enrollmentItemId: string,
        public readonly courseId: string,
        public readonly creditsAttempted: number,
        public readonly creditsEarned: number, // Can be 0 if PassStatus is false
        public readonly gradePoint: number,
        public readonly passStatus: boolean,
        public readonly finalGradeId: string,
        public readonly version: number,
        public readonly academicTermId: string
    ) {}
}
