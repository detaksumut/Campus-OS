export enum LeaveStatus {
    Requested = 'Requested',
    Approved = 'Approved',
    Rejected = 'Rejected',
    Cancelled = 'Cancelled'
}

export enum LeaveType {
    Annual = 'Annual',
    Sick = 'Sick',
    Maternity = 'Maternity',
    Unpaid = 'Unpaid'
}

export class Leave {
    constructor(
        public readonly leaveId: string,
        public readonly employeeId: string,
        public readonly type: LeaveType,
        public readonly startDate: Date,
        public readonly endDate: Date,
        public readonly reason: string,
        public status: LeaveStatus = LeaveStatus.Requested,
        public approvedBy?: string,
        public approvalDate?: Date
    ) {}

    public approve(approverId: string, date: Date): void {
        this.status = LeaveStatus.Approved;
        this.approvedBy = approverId;
        this.approvalDate = date;
    }

    public reject(approverId: string, date: Date): void {
        this.status = LeaveStatus.Rejected;
        this.approvedBy = approverId;
        this.approvalDate = date;
    }
}
