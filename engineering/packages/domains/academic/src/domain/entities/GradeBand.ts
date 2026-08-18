export class GradeBand {
    constructor(
        public readonly minScore: number,
        public readonly maxScore: number,
        public readonly letterGrade: string,
        public readonly gradePoint: number,
        public readonly passStatus: boolean
    ) {
        if (minScore > maxScore) {
            throw new Error("minScore cannot be greater than maxScore.");
        }
    }
}
