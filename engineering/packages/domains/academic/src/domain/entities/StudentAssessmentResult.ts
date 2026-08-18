import { FinalGradeStatus } from './FinalGradeStatus';
import { ComponentResult } from './ComponentResult';
import { FinalGradeSnapshot } from './FinalGradeSnapshot';
import { GradeCorrectionRequest } from './GradeCorrectionRequest';

export class StudentAssessmentResult {
    constructor(
        public readonly assessmentResultId: string,
        public readonly enrollmentItemId: string,
        public components: ComponentResult[],
        public finalGradeSnapshot: FinalGradeSnapshot | null,
        public status: FinalGradeStatus,
        public corrections: GradeCorrectionRequest[]
    ) {}

    public static initialize(enrollmentItemId: string): StudentAssessmentResult {
        return new StudentAssessmentResult(
            `SAR-${crypto.randomUUID()}`,
            enrollmentItemId,
            [],
            null,
            FinalGradeStatus.Draft,
            []
        );
    }

    public recordComponentScore(componentResult: ComponentResult): void {
        this.ensureEditable();
        const existingIndex = this.components.findIndex(c => c.componentId === componentResult.componentId);
        if (existingIndex >= 0) {
            this.components[existingIndex] = componentResult;
        } else {
            this.components.push(componentResult);
        }
    }

    public submitCalculatedGrade(snapshot: FinalGradeSnapshot): void {
        this.ensureEditable();
        this.finalGradeSnapshot = snapshot;
        this.status = FinalGradeStatus.Submitted;
    }

    public finalizeGrade(): void {
        if (this.status !== FinalGradeStatus.Submitted) {
            throw new Error("Grade must be Submitted before it can be Finalized.");
        }
        if (!this.finalGradeSnapshot) {
            throw new Error("Cannot finalize without a calculated grade snapshot.");
        }
        this.status = FinalGradeStatus.Finalized;
    }

    public addCorrectionRequest(request: GradeCorrectionRequest): void {
        if (this.status !== FinalGradeStatus.Finalized) {
            throw new Error("Correction requests can only be made on Finalized grades.");
        }
        this.corrections.push(request);
    }

    public applyCorrection(requestId: string, newSnapshot: FinalGradeSnapshot): void {
        const request = this.corrections.find(c => c.correctionRequestId === requestId);
        if (!request) {
            throw new Error("Correction request not found.");
        }
        request.apply();
        
        // Update components based on proposed correction
        request.proposedComponentResults.forEach(proposed => {
            const existingIndex = this.components.findIndex(c => c.componentId === proposed.componentId);
            if (existingIndex >= 0) {
                this.components[existingIndex] = proposed;
            } else {
                this.components.push(proposed);
            }
        });

        // Apply new final grade snapshot
        this.finalGradeSnapshot = newSnapshot;
    }

    private ensureEditable(): void {
        if (this.status === FinalGradeStatus.Finalized) {
            throw new Error("Cannot modify components of a Finalized grade. Use Correction Request workflow.");
        }
    }
}
