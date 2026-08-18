import { ClassSectionId, LecturerId, BuildingId } from '../value-objects/CourseOfferingValueObjects';
import { TeachingRole } from '../types/CourseOfferingEnums';

export class TeachingAssignment {
  constructor(
    public readonly lecturerId: LecturerId,
    public readonly role: TeachingRole
  ) {}
}

export class RoomSchedule {
  constructor(
    public readonly buildingId: BuildingId,
    public readonly roomName: string,
    public readonly dayOfWeek: number, // 0 = Sunday, 1 = Monday, etc.
    public readonly startTime: string, // e.g. "08:00"
    public readonly endTime: string
  ) {}
}

export class ClassSection {
  private assignments: TeachingAssignment[] = [];
  private schedules: RoomSchedule[] = [];

  constructor(
    public readonly id: ClassSectionId,
    public readonly name: string, // e.g., "Kelas A", "Kelas B"
    public readonly capacity: number,
    public readonly enrolledCount: number = 0
  ) {}

  get allAssignments(): ReadonlyArray<TeachingAssignment> { return this.assignments; }
  get allSchedules(): ReadonlyArray<RoomSchedule> { return this.schedules; }

  assignTeacher(lecturerId: LecturerId, role: TeachingRole): void {
    this.assignments.push(new TeachingAssignment(lecturerId, role));
  }

  scheduleRoom(schedule: RoomSchedule): void {
    this.schedules.push(schedule);
  }

  isFull(): boolean {
    return this.enrolledCount >= this.capacity;
  }
}
