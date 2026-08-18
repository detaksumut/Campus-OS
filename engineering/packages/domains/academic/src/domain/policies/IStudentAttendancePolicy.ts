import { AttendanceSession } from '../entities/AttendanceSession';

export interface IStudentAttendancePolicy {
    evaluateLateArrival(checkInTime: Date, session: AttendanceSession): boolean;
    evaluateGracePeriod(session: AttendanceSession, checkInTime: Date): boolean;
    evaluateMinimumAttendance(totalMeetings: number, attendedMeetings: number): boolean;
    canCheckIn(session: AttendanceSession, checkInTime: Date): boolean;
}
