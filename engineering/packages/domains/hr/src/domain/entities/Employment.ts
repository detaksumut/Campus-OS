export enum EmploymentStatus {
    Active = 'Active',
    Suspended = 'Suspended',
    Terminated = 'Terminated',
    OnLeave = 'OnLeave'
}

export enum EmploymentType {
    Permanent = 'Permanent',
    Contract = 'Contract',
    PartTime = 'PartTime'
}

export class Employment {
    constructor(
        public readonly employmentId: string,
        public readonly employeeId: string,
        public readonly positionId: string,
        public readonly departmentId: string,
        public type: EmploymentType,
        public status: EmploymentStatus,
        public readonly startDate: Date,
        public endDate?: Date
    ) {}
}
