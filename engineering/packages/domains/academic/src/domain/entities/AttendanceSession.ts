export enum AttendanceSessionStatus {
    Draft = 'Draft',
    Open = 'Open',
    Closed = 'Closed',
    Archived = 'Archived'
}

export class AttendanceSession {
    constructor(
        public readonly sessionId: string,
        public readonly classMeetingId: string,
        public status: AttendanceSessionStatus = AttendanceSessionStatus.Draft,
        public openedAt?: Date,
        public closedAt?: Date,
        public readonly locationOverride?: string,
        public readonly validationRules: string[] = []
    ) {}

    public openSession(time: Date): void {
        if (this.status !== AttendanceSessionStatus.Draft) {
            throw new Error("Only draft sessions can be opened");
        }
        this.status = AttendanceSessionStatus.Open;
        this.openedAt = time;
    }

    public closeSession(time: Date): void {
        if (this.status !== AttendanceSessionStatus.Open) {
            throw new Error("Only open sessions can be closed");
        }
        this.status = AttendanceSessionStatus.Closed;
        this.closedAt = time;
    }

    public archive(): void {
        if (this.status !== AttendanceSessionStatus.Closed) {
            throw new Error("Only closed sessions can be archived");
        }
        this.status = AttendanceSessionStatus.Archived;
    }
}
