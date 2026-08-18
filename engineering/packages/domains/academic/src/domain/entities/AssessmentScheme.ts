import { AssessmentSchemeStatus } from './AssessmentSchemeStatus';
import { AssessmentComponent } from './AssessmentComponent';

export class AssessmentScheme {
    constructor(
        public readonly schemeId: string,
        public readonly offeringId: string,
        public status: AssessmentSchemeStatus,
        public components: AssessmentComponent[]
    ) {}

    public static create(offeringId: string): AssessmentScheme {
        return new AssessmentScheme(
            `ASC-${crypto.randomUUID()}`,
            offeringId,
            AssessmentSchemeStatus.Draft,
            []
        );
    }

    public addComponent(name: string, weightBasisPoints: number): void {
        this.ensureEditable();
        this.components.push(new AssessmentComponent(`CMP-${crypto.randomUUID()}`, name, weightBasisPoints));
    }

    public publish(): void {
        this.ensureEditable();
        this.validateTotalWeight();
        this.status = AssessmentSchemeStatus.Published;
    }

    public lock(): void {
        this.validateTotalWeight();
        this.status = AssessmentSchemeStatus.Locked;
    }

    private validateTotalWeight(): void {
        const total = this.components.reduce((sum, c) => sum + c.weightBasisPoints, 0);
        if (total !== 10000) {
            throw new Error(`Total component weight must be exactly 100% (10000 basis points). Current: ${total}`);
        }
    }

    private ensureEditable(): void {
        if (this.status === AssessmentSchemeStatus.Locked) {
            throw new Error("Cannot modify a Locked Assessment Scheme.");
        }
    }
}
