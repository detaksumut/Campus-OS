import { IdentityContext } from '@campus-os/identity/src/contracts';
import { AttendanceService } from './services/AttendanceService';
import { ClassMeeting } from '../domain/entities/ClassMeeting';
import { AttendanceStatus } from '../domain/entities/AttendanceStatus';
import { AttendanceMethod } from '../domain/entities/AttendanceMethod';
import { IEnrollmentProvider } from '../contracts/IEnrollmentProvider';

export class AttendanceRuntime {
    constructor(
        private readonly attendanceService: AttendanceService,
        private readonly enrollmentProvider: IEnrollmentProvider
    ) {}

    public async scheduleMeeting(context: IdentityContext, offeringId: string, meetingNumber: number): Promise<ClassMeeting> {
        return this.attendanceService.scheduleMeeting(context, offeringId, meetingNumber);
    }

    public async startMeeting(context: IdentityContext, meeting: ClassMeeting): Promise<void> {
        return this.attendanceService.startMeeting(context, meeting);
    }

    public async openAttendanceSession(context: IdentityContext, meeting: ClassMeeting, validDurationMinutes: number): Promise<void> {
        return this.attendanceService.openAttendanceSession(context, meeting, validDurationMinutes);
    }

    public async closeAttendanceSession(context: IdentityContext, meeting: ClassMeeting): Promise<void> {
        return this.attendanceService.closeAttendanceSession(context, meeting);
    }

    public async recordAttendance(
        context: IdentityContext, 
        meeting: ClassMeeting, 
        studentId: string, 
        status: AttendanceStatus, 
        method: AttendanceMethod,
        tokenString?: string
    ): Promise<void> {
        return this.attendanceService.recordAttendance(context, meeting, studentId, status, method, tokenString);
    }

    public async completeMeeting(context: IdentityContext, meeting: ClassMeeting): Promise<void> {
        return this.attendanceService.completeMeeting(context, meeting);
    }

    public async finalizeMeeting(context: IdentityContext, meeting: ClassMeeting): Promise<void> {
        // Retrieve all eligible students for explicit absent generation
        const enrolledIds = await this.enrollmentProvider.getEnrolledStudents(meeting.offeringId);
        
        // Mock mapping since we just need {studentId, enrollmentItemId}
        const enrolledStudents = enrolledIds.map(id => ({ studentId: id, enrollmentItemId: `ENI-${id}-${meeting.offeringId}` }));
        
        return this.attendanceService.finalizeMeeting(context, meeting, enrolledStudents);
    }

    public async correctAttendance(
        context: IdentityContext, 
        meeting: ClassMeeting, 
        studentId: string, 
        newStatus: AttendanceStatus, 
        reason: string
    ): Promise<void> {
        return this.attendanceService.correctAttendance(context, meeting, studentId, newStatus, reason);
    }
}
