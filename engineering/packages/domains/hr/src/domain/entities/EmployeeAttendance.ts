export enum EmployeeAttendanceStatus {
    Present = 'Present',
    Late = 'Late',
    Absent = 'Absent',
    OnLeave = 'OnLeave',
    HalfDay = 'HalfDay'
}

export class EmployeeAttendance {
    constructor(
        public readonly attendanceId: string,
        public readonly employeeId: string,
        public readonly shiftId: string,
        public readonly date: Date,
        public clockIn?: Date,
        public clockOut?: Date,
        public status: EmployeeAttendanceStatus = EmployeeAttendanceStatus.Absent,
        public isOvertime: boolean = false,
        public overtimeHours: number = 0
    ) {}

    public recordClockIn(time: Date, isLate: boolean): void {
        this.clockIn = time;
        this.status = isLate ? EmployeeAttendanceStatus.Late : EmployeeAttendanceStatus.Present;
    }

    public recordClockOut(time: Date): void {
        this.clockOut = time;
    }

    public setOvertime(hours: number): void {
        this.isOvertime = true;
        this.overtimeHours = hours;
    }
}
