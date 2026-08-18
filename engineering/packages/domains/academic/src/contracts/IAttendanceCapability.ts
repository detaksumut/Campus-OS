import { IdentityContext } from '@campus-os/identity/src/contracts';
import { AttendanceStatus } from '../domain/entities/AttendanceStatus';
import { AttendanceMethod } from '../domain/entities/AttendanceMethod';

export interface IAttendanceCapability {
    scheduleMeeting(context: IdentityContext, offeringId: string, meetingNumber: number): Promise<string>;
    
    startMeeting(context: IdentityContext, classMeetingId: string): Promise<void>;
    
    openAttendanceSession(context: IdentityContext, classMeetingId: string, validDurationMinutes: number): Promise<void>;
    
    closeAttendanceSession(context: IdentityContext, classMeetingId: string): Promise<void>;
    
    recordAttendance(context: IdentityContext, classMeetingId: string, studentId: string, status: AttendanceStatus, method: AttendanceMethod, tokenString?: string): Promise<void>;
    
    completeMeeting(context: IdentityContext, classMeetingId: string): Promise<void>;
    
    finalizeMeeting(context: IdentityContext, classMeetingId: string): Promise<void>;
    
    correctAttendance(context: IdentityContext, classMeetingId: string, studentId: string, newStatus: AttendanceStatus, reason: string): Promise<void>;
}
