import { GradeScaleStatus } from './GradeScaleStatus';
import { GradeBand } from './GradeBand';

export class GradeScale {
    constructor(
        public readonly gradeScaleId: string,
        public readonly version: number,
        public name: string,
        public effectiveFrom: Date,
        public effectiveUntil: Date | null,
        public status: GradeScaleStatus,
        public bands: GradeBand[]
    ) {}

    public static create(name: string, effectiveFrom: Date): GradeScale {
        return new GradeScale(
            `GSC-${crypto.randomUUID()}`,
            1,
            name,
            effectiveFrom,
            null,
            GradeScaleStatus.Draft,
            []
        );
    }

    public addBand(minScore: number, maxScore: number, letterGrade: string, gradePoint: number, passStatus: boolean): void {
        this.ensureEditable();
        this.bands.push(new GradeBand(minScore, maxScore, letterGrade, gradePoint, passStatus));
    }

    public activate(): void {
        this.ensureEditable();
        // Validation: Ensure contiguous bands (0-100 logic) could be added here
        this.status = GradeScaleStatus.Active;
    }

    public archive(effectiveUntil: Date): void {
        this.status = GradeScaleStatus.Archived;
        this.effectiveUntil = effectiveUntil;
    }

    private ensureEditable(): void {
        if (this.status !== GradeScaleStatus.Draft) {
            throw new Error("Only Draft Grade Scales can be modified.");
        }
    }
}
