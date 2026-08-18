import { EnrollmentItemStatus } from './EnrollmentItemStatus';

export class EnrollmentItem {
    constructor(
        public readonly enrollmentItemId: string,
        public readonly offeringId: string,
        public status: EnrollmentItemStatus,
        public readonly addedAt: Date,
        public readonly addedBy: string,
        public droppedAt?: Date,
        public droppedBy?: string,
        public dropReason?: string,
        public validationSnapshot?: any
    ) {}

    public static create(offeringId: string, addedBy: string, validationSnapshot?: any): EnrollmentItem {
        const id = `ENI-${crypto.randomUUID()}`;
        return new EnrollmentItem(
            id,
            offeringId,
            EnrollmentItemStatus.Planned,
            new Date(),
            addedBy,
            undefined,
            undefined,
            undefined,
            validationSnapshot
        );
    }

    public enroll(): void {
        this.status = EnrollmentItemStatus.Enrolled;
    }

    public waitlist(): void {
        this.status = EnrollmentItemStatus.Waitlisted;
    }

    public drop(droppedBy: string, reason: string): void {
        this.status = EnrollmentItemStatus.Dropped;
        this.droppedAt = new Date();
        this.droppedBy = droppedBy;
        this.dropReason = reason;
    }
}
