export enum AssignmentStatus {
    Active = 'Active',
    Cancelled = 'Cancelled'
}

export class LecturerAssignment {
    constructor(
        public readonly assignmentId: string, // Unique assignment ID
        public readonly lecturerId: string, // Link to LecturerAcademicProfile
        public teachingRole: string, // e.g. "Primary", "Assistant", "Guest"
        public creditLoad: number, // Weighted credits for remuneration/teaching load calculations
        public isCoordinator: boolean,
        public status: AssignmentStatus
    ) {}

    public static create(
        lecturerId: string,
        teachingRole: string,
        creditLoad: number,
        isCoordinator: boolean
    ): LecturerAssignment {
        const id = `ASN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        return new LecturerAssignment(
            id,
            lecturerId,
            teachingRole,
            creditLoad,
            isCoordinator,
            AssignmentStatus.Active
        );
    }
}
