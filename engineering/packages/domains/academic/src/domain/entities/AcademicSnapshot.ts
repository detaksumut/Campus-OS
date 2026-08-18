export class AcademicSnapshot {
    constructor(
        public readonly curriculumId: string,
        public readonly curriculumVersion: number,
        public readonly creditsRequired: number,
        public readonly creditsEarned: number,
        public readonly gpa: number,
        public readonly progressionResultVersion: number
    ) {}
}
