export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  EXCUSED = 'EXCUSED',
  SICK = 'SICK',
  LATE = 'LATE'
}

export class AttendanceSession {
  constructor(
    public readonly id: string,
    public status: AttendanceStatus,
    public readonly recordedAt: Date
  ) {}
}
