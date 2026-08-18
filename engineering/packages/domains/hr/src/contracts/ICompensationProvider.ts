export interface ICompensationProvider {
    reportEmployeeAttendance(employeeId: string, month: number, year: number, totalPresent: number, totalLate: number, totalAbsent: number): Promise<void>;
    reportOvertime(employeeId: string, date: Date, hours: number): Promise<void>;
    reportLeave(employeeId: string, startDate: Date, endDate: Date, type: string): Promise<void>;
}
