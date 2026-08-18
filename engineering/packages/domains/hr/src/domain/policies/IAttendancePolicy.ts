import { EmployeeAttendance } from '../entities/EmployeeAttendance';
import { Shift } from '../entities/Shift';

export interface IAttendancePolicy {
    evaluateLateArrival(clockInTime: Date, shift: Shift): boolean;
    calculateOvertime(attendance: EmployeeAttendance, shift: Shift): number;
    evaluateEarlyLeave(clockOutTime: Date, shift: Shift): boolean;
}
