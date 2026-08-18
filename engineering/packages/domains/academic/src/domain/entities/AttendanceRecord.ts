import { AttendanceStatus } from './AttendanceStatus';
import { AttendanceCorrection } from './AttendanceCorrection';

export enum AttendanceVerificationMethod {
    QR = 'QR',
    RFID = 'RFID',
    NFC = 'NFC',
    GPS = 'GPS',
    FaceRecognition = 'FaceRecognition',
    LMS = 'LMS',
    MeetingIntegration = 'MeetingIntegration',
    Manual = 'Manual',
    Other = 'Other'
}

export class AttendanceRecord {
    constructor(
        public readonly attendanceRecordId: string,
        public readonly studentId: string,
        public readonly enrollmentItemId: string,
        public status: AttendanceStatus,
        public method: AttendanceVerificationMethod,
        public readonly recordedAt: Date,
        public corrections: AttendanceCorrection[] = []
    ) {}

    public correctStatus(
        newStatus: AttendanceStatus,
        reason: string,
        correctedBy: string,
        authorizationReference?: string
    ): void {
        const correction = new AttendanceCorrection(
            this.status,
            newStatus,
            reason,
            correctedBy,
            new Date(),
            authorizationReference
        );
        this.corrections.push(correction);
        this.status = newStatus;
        this.method = AttendanceVerificationMethod.Manual;
    }
}
