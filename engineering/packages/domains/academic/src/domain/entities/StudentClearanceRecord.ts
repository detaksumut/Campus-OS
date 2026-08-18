import { ClearanceStatus } from './ClearanceStatus';

export class StudentClearanceRecord {
    constructor(
        public readonly clearanceRecordId: string,
        public readonly studentId: string,
        public readonly clearanceType: string,
        public readonly sourceDomain: string,
        public status: ClearanceStatus,
        public readonly sourceReference: string,
        public readonly sourceVersion: number,
        public readonly effectiveAt: Date,
        public readonly expiresAt: Date | null,
        public lastUpdatedAt: Date
    ) {}

    public updateStatus(newStatus: ClearanceStatus, sourceVersion: number, newExpiry: Date | null): void {
        if (sourceVersion <= this.sourceVersion) {
            // Idempotency / ordering protection
            return; 
        }
        this.status = newStatus;
        (this as any).sourceVersion = sourceVersion;
        (this as any).expiresAt = newExpiry;
        this.lastUpdatedAt = new Date();
    }
}
