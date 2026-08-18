import { GradeCorrectionRequestStatus } from './GradeCorrectionRequestStatus';
import { FinalGradeSnapshot } from './FinalGradeSnapshot';
import { ComponentResult } from './ComponentResult';

export class GradeCorrectionRequest {
    constructor(
        public readonly correctionRequestId: string,
        public readonly previousGradeSnapshot: FinalGradeSnapshot,
        public readonly proposedComponentResults: ComponentResult[],
        public readonly reason: string,
        public readonly requestedBy: string,
        public readonly requestedAt: Date,
        public status: GradeCorrectionRequestStatus,
        public approvedBy: string | null = null,
        public approvedAt: Date | null = null,
        public rejectionReason: string | null = null
    ) {}

    public approve(approvedBy: string): void {
        if (this.status !== GradeCorrectionRequestStatus.Requested) {
            throw new Error("Only Requested corrections can be approved.");
        }
        this.status = GradeCorrectionRequestStatus.Approved;
        this.approvedBy = approvedBy;
        this.approvedAt = new Date();
    }

    public reject(rejectedBy: string, reason: string): void {
        if (this.status !== GradeCorrectionRequestStatus.Requested) {
            throw new Error("Only Requested corrections can be rejected.");
        }
        this.status = GradeCorrectionRequestStatus.Rejected;
        this.approvedBy = rejectedBy; // Acting as the reviewer
        this.approvedAt = new Date();
        this.rejectionReason = reason;
    }

    public apply(): void {
        if (this.status !== GradeCorrectionRequestStatus.Approved) {
            throw new Error("Only Approved corrections can be applied.");
        }
        this.status = GradeCorrectionRequestStatus.Applied;
    }
}
