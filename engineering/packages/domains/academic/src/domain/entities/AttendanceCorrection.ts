import { AttendanceStatus } from './AttendanceStatus';

export class AttendanceCorrection {
    constructor(
        public readonly previousStatus: AttendanceStatus,
        public readonly newStatus: AttendanceStatus,
        public readonly reason: string,
        public readonly correctedBy: string,
        public readonly correctedAt: Date,
        public readonly authorizationReference?: string
    ) {}
}
