export class FinalGradeSnapshot {
    constructor(
        public readonly numericScore: number,
        public readonly letterGrade: string,
        public readonly gradePoint: number,
        public readonly passStatus: boolean,
        public readonly gradeScaleId: string,
        public readonly gradeScaleVersion: number
    ) {}
}
