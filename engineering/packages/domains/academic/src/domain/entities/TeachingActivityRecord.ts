export enum TeachingActivityStatus {
    Scheduled = 'Scheduled',
    Started = 'Started',
    Completed = 'Completed',
    Cancelled = 'Cancelled'
}

export enum TeachingDeliveryMode {
    Offline = 'Offline',
    Online = 'Online',
    Hybrid = 'Hybrid'
}

export class TeachingActivityRecord {
    constructor(
        public readonly activityId: string,
        public readonly courseOfferingId: string,
        public readonly classMeetingId: string,
        public readonly lecturerProfileId: string,
        public deliveryMode: TeachingDeliveryMode,
        public status: TeachingActivityStatus = TeachingActivityStatus.Scheduled,
        public startedAt?: Date,
        public endedAt?: Date,
        public durationMinutes?: number,
        public platform?: string,
        public evidence?: string
    ) {}

    public startActivity(time: Date, platform?: string, evidence?: string): void {
        if (this.status === TeachingActivityStatus.Cancelled) {
            throw new Error("Cannot start a cancelled teaching activity");
        }
        this.status = TeachingActivityStatus.Started;
        this.startedAt = time;
        this.platform = platform;
        this.evidence = evidence;
    }

    public endActivity(time: Date): void {
        if (this.status !== TeachingActivityStatus.Started) {
            throw new Error("Cannot end an activity that has not been started");
        }
        this.status = TeachingActivityStatus.Completed;
        this.endedAt = time;
        if (this.startedAt) {
            this.durationMinutes = Math.round((time.getTime() - this.startedAt.getTime()) / 60000);
        }
    }

    public cancelActivity(): void {
        this.status = TeachingActivityStatus.Cancelled;
    }
}
