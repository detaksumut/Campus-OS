import { CourseOfferingStatus } from './CourseOfferingStatus';
import { LecturerAssignment } from './LecturerAssignment';
import { ClassSchedule } from './ClassSchedule';

export class CourseOffering {
    constructor(
        public readonly offeringId: string, // e.g. OFR-xxxx
        public offeringCode: string, // e.g. "TI-A", "Kelas Paralel 1"
        public readonly courseId: string,
        public readonly academicTermId: string,
        public hostStudyProgramId: string,
        public curriculumCourseId: string | null,
        public quota: number,
        public status: CourseOfferingStatus,
        public lecturerAssignments: LecturerAssignment[],
        public scheduleAssignments: ClassSchedule[]
    ) {}

    public static create(
        offeringCode: string,
        courseId: string,
        academicTermId: string,
        hostStudyProgramId: string,
        curriculumCourseId: string | null,
        quota: number
    ): CourseOffering {
        const id = `OFR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        return new CourseOffering(
            id,
            offeringCode,
            courseId,
            academicTermId,
            hostStudyProgramId,
            curriculumCourseId,
            quota,
            CourseOfferingStatus.Draft,
            [],
            []
        );
    }

    public assignLecturer(assignment: LecturerAssignment): void {
        this.lecturerAssignments.push(assignment);
    }

    public unassignLecturer(assignmentId: string): void {
        this.lecturerAssignments = this.lecturerAssignments.filter(a => a.assignmentId !== assignmentId);
    }

    public assignSchedule(schedule: ClassSchedule): void {
        this.scheduleAssignments.push(schedule);
    }

    public changeStatus(newStatus: CourseOfferingStatus): void {
        this.status = newStatus;
    }
}
