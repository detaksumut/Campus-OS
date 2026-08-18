import { EnrollmentStatus } from './EnrollmentStatus';
import { EnrollmentItem } from './EnrollmentItem';
import { EnrollmentItemStatus } from './EnrollmentItemStatus';

export class Enrollment {
    constructor(
        public readonly enrollmentId: string, // e.g. ENR-xxxx
        public readonly studentId: string,
        public readonly academicTermId: string,
        public academicAdvisorId: string | null, // snapshot per term
        public approvedByLecturerId: string | null, // actual approval actor
        public approvedAt: Date | null,
        public status: EnrollmentStatus,
        public items: EnrollmentItem[]
    ) {}

    public static create(
        studentId: string,
        academicTermId: string,
        academicAdvisorId: string | null
    ): Enrollment {
        const id = `ENR-${crypto.randomUUID()}`;
        return new Enrollment(
            id,
            studentId,
            academicTermId,
            academicAdvisorId,
            null,
            null,
            EnrollmentStatus.Draft,
            []
        );
    }

    public addItem(item: EnrollmentItem): void {
        if (this.status === EnrollmentStatus.Finalized || this.status === EnrollmentStatus.ReFinalized) {
            throw new Error("Cannot add item to a finalized enrollment without AddDropOpen status.");
        }
        this.items.push(item);
    }

    public dropItem(offeringId: string, droppedBy: string, reason: string): void {
        if (this.status === EnrollmentStatus.Finalized || this.status === EnrollmentStatus.ReFinalized) {
            throw new Error("Cannot drop item from a finalized enrollment without AddDropOpen status.");
        }
        const item = this.items.find(i => i.offeringId === offeringId && i.status !== EnrollmentItemStatus.Dropped);
        if (item) {
            item.drop(droppedBy, reason);
        }
    }

    public submit(): void {
        if (this.status !== EnrollmentStatus.Draft && this.status !== EnrollmentStatus.Rejected) {
            throw new Error("Can only submit from Draft or Rejected status.");
        }
        this.status = EnrollmentStatus.SubmittedForApproval;
    }

    public approve(approvedByLecturerId: string): void {
        if (this.status !== EnrollmentStatus.SubmittedForApproval) {
            throw new Error("Can only approve SubmittedForApproval status.");
        }
        this.status = EnrollmentStatus.Approved;
        this.approvedByLecturerId = approvedByLecturerId;
        this.approvedAt = new Date();
    }

    public reject(): void {
        if (this.status !== EnrollmentStatus.SubmittedForApproval) {
            throw new Error("Can only reject SubmittedForApproval status.");
        }
        this.status = EnrollmentStatus.Rejected;
        this.approvedByLecturerId = null;
        this.approvedAt = null;
    }

    public finalize(): void {
        if (this.status !== EnrollmentStatus.Approved) {
            throw new Error("Can only finalize Approved status.");
        }
        this.status = EnrollmentStatus.Finalized;
    }

    public openAddDrop(): void {
        if (this.status !== EnrollmentStatus.Finalized && this.status !== EnrollmentStatus.ReFinalized) {
            throw new Error("Can only open AddDrop from Finalized status.");
        }
        this.status = EnrollmentStatus.AddDropOpen;
    }

    public reFinalize(): void {
        if (this.status !== EnrollmentStatus.AddDropOpen) {
            throw new Error("Can only re-finalize from AddDropOpen status.");
        }
        this.status = EnrollmentStatus.ReFinalized;
    }
}
