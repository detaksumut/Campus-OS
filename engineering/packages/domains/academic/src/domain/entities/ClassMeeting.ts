import { ClassMeetingStatus } from './ClassMeetingStatus';
import { AttendanceSession, AttendanceSessionStatus } from './AttendanceSession';
import { AttendanceRecord, AttendanceVerificationMethod } from './AttendanceRecord';
import { AttendanceStatus } from './AttendanceStatus';
import { TeachingActivityRecord, TeachingActivityStatus } from './TeachingActivityRecord';


export class ClassMeeting {
    constructor(
        public readonly classMeetingId: string,
        public readonly offeringId: string,
        public readonly meetingNumber: number,
        public status: ClassMeetingStatus,
        public session: AttendanceSession,
        public records: AttendanceRecord[],
        public teachingActivity?: TeachingActivityRecord
    ) {}

    public static schedule(offeringId: string, meetingNumber: number): ClassMeeting {
        const meetingId = `CLM-${crypto.randomUUID()}`;
        return new ClassMeeting(
            meetingId,
            offeringId,
            meetingNumber,
            ClassMeetingStatus.Scheduled,
            new AttendanceSession(`ATS-${crypto.randomUUID()}`, meetingId),
            []
        );
    }

    public startTeaching(activity: TeachingActivityRecord, time: Date): void {
        if (this.status !== ClassMeetingStatus.Scheduled) {
            throw new Error("Only Scheduled meetings can be started.");
        }
        if (activity.status === TeachingActivityStatus.Cancelled) {
            throw new Error("Cannot open attendance session for a cancelled teaching activity.");
        }
        
        this.status = ClassMeetingStatus.InProgress;
        this.teachingActivity = activity;
        this.teachingActivity.startActivity(time);
        
        // ADR-024: Teaching Activity Drives Student Attendance
        this.session.openSession(time);
    }

    public completeTeaching(time: Date): void {
        if (this.status !== ClassMeetingStatus.InProgress || !this.teachingActivity) {
            throw new Error("Only InProgress meetings can be completed.");
        }
        this.teachingActivity.endActivity(time);
        
        if (this.session.status === AttendanceSessionStatus.Open) {
            this.session.closeSession(time);
        }
        this.status = ClassMeetingStatus.Completed;
    }

    public finalize(eligibleEnrollmentItems: {studentId: string, enrollmentItemId: string}[]): void {
        if (this.status !== ClassMeetingStatus.Completed) {
            throw new Error("Only Completed meetings can be finalized.");
        }
        
        // ADR-016: Explicit Attendance Finalization
        for (const eligible of eligibleEnrollmentItems) {
            const hasRecord = this.records.some(r => r.studentId === eligible.studentId);
            if (!hasRecord) {
                // Generate Auto-Absent record
                this.records.push(new AttendanceRecord(
                    `ATR-${crypto.randomUUID()}`,
                    eligible.studentId,
                    eligible.enrollmentItemId,
                    AttendanceStatus.Absent,
                    AttendanceVerificationMethod.Other,
                    new Date()
                ));
            }
        }
        
        this.status = ClassMeetingStatus.Finalized;
    }

    public cancel(): void {
        this.status = ClassMeetingStatus.Cancelled;
        if (this.teachingActivity) {
            this.teachingActivity.cancelActivity();
        }
        if (this.session.status === AttendanceSessionStatus.Open) {
            this.session.closeSession(new Date());
        }
    }

    public recordAttendance(studentId: string, enrollmentItemId: string, status: AttendanceStatus, method: AttendanceVerificationMethod): void {
        if (this.status === ClassMeetingStatus.Finalized || this.status === ClassMeetingStatus.Cancelled) {
            throw new Error("Cannot record attendance for Finalized or Cancelled meetings.");
        }
        if (this.session.status !== AttendanceSessionStatus.Open) {
            throw new Error("Cannot record attendance. Session is closed.");
        }
        
        const existing = this.records.find(r => r.studentId === studentId);
        if (existing) {
            throw new Error("Attendance already recorded for this student.");
        }

        this.records.push(new AttendanceRecord(
            `ATR-${crypto.randomUUID()}`,
            studentId,
            enrollmentItemId,
            status,
            method,
            new Date()
        ));
    }
}
