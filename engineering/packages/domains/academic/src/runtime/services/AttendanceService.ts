import { IdentityContext } from '@campus-os/identity/src/contracts';
import { ClassMeeting } from '../domain/entities/ClassMeeting';
import { AttendanceStatus } from '../domain/entities/AttendanceStatus';
import { AttendanceVerificationMethod } from '../domain/entities/AttendanceRecord';
import { TeachingActivityRecord, TeachingDeliveryMode } from '../domain/entities/TeachingActivityRecord';
import { AttendanceEligibilityPolicy } from '../domain/policies/AttendanceEligibilityPolicy';
import { IEnrollmentProvider } from '../contracts/IEnrollmentProvider';

export class AttendanceService {
    constructor(
        private readonly enrollmentProvider: IEnrollmentProvider,
        private readonly eligibilityPolicy: AttendanceEligibilityPolicy
    ) {}

    public async scheduleMeeting(context: IdentityContext, offeringId: string, meetingNumber: number): Promise<ClassMeeting> {
        this.enforcePermission(context, 'academic.attendance.manage');
        return ClassMeeting.schedule(offeringId, meetingNumber);
    }

    public async startTeaching(context: IdentityContext, meeting: ClassMeeting, lecturerProfileId: string, mode: TeachingDeliveryMode, time: Date): Promise<TeachingActivityRecord> {
        this.enforcePermission(context, 'academic.attendance.record');
        const activity = new TeachingActivityRecord(
            `TAR-${crypto.randomUUID()}`,
            meeting.offeringId,
            meeting.classMeetingId,
            lecturerProfileId,
            mode
        );
        meeting.startTeaching(activity, time);
        return activity;
    }

    public async completeTeaching(context: IdentityContext, meeting: ClassMeeting, time: Date): Promise<void> {
        this.enforcePermission(context, 'academic.attendance.record');
        meeting.completeTeaching(time);
    }

    public async recordAttendance(
        context: IdentityContext, 
        meeting: ClassMeeting, 
        studentId: string, 
        status: AttendanceStatus, 
        method: AttendanceVerificationMethod
    ): Promise<void> {
        // Enforce strict enrollment validation
        const enrollment = await this.enrollmentProvider.getEnrollment(studentId, meeting.offeringId);
        if (!enrollment || enrollment.status !== 'Approved') {
            throw new Error(`Student ${studentId} does not have an active enrollment for offering ${meeting.offeringId}.`);
        }
        
        const enrollmentItem = enrollment.items.find(i => i.offeringId === meeting.offeringId);
        if (!enrollmentItem || enrollmentItem.status !== 'Active') {
            throw new Error(`Student ${studentId} does not have an active enrollment item for offering ${meeting.offeringId}.`);
        }

        meeting.recordAttendance(studentId, enrollmentItem.enrollmentItemId, status, method);
    }

    public async finalizeMeeting(context: IdentityContext, meeting: ClassMeeting, enrolledStudents: {studentId: string, enrollmentItemId: string}[]): Promise<void> {
        this.enforcePermission(context, 'academic.attendance.finalize');
        
        // ADR-016: Explicit Absent Generation
        meeting.finalize(enrolledStudents);
    }

    public async correctAttendance(
        context: IdentityContext, 
        meeting: ClassMeeting, 
        studentId: string, 
        newStatus: AttendanceStatus, 
        reason: string
    ): Promise<void> {
        this.enforcePermission(context, 'academic.attendance.correct');
        
        const record = meeting.records.find(r => r.studentId === studentId);
        if (!record) {
            throw new Error("Cannot correct attendance for a student with no record. Ensure meeting is finalized or manually record first.");
        }

        record.correctStatus(newStatus, reason, context.userId, `REQ-${crypto.randomUUID()}`);
    }

    private enforcePermission(context: IdentityContext, requiredPermission: string): void {
        if (!context.permissions.includes(requiredPermission)) {
            throw new Error(`Forbidden: Missing ${requiredPermission} permission`);
        }
    }
}
