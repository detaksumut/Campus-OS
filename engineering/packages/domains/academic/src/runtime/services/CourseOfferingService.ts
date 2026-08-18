import { IdentityContext } from '@campus-os/identity/src/contracts';
import { CourseOffering } from '../domain/entities/CourseOffering';
import { CourseOfferingStatus } from '../domain/entities/CourseOfferingStatus';
import { LecturerAssignment } from '../domain/entities/LecturerAssignment';
import { ClassSchedule } from '../domain/entities/ClassSchedule';

export class CourseOfferingService {
    
    public async createOffering(
        context: IdentityContext,
        offeringCode: string,
        courseId: string,
        academicTermId: string,
        hostStudyProgramId: string,
        curriculumCourseId: string | null,
        quota: number
    ): Promise<CourseOffering> {
        this.enforcePermission(context);
        const offering = CourseOffering.create(
            offeringCode, courseId, academicTermId, hostStudyProgramId, curriculumCourseId, quota
        );
        // Emit CourseOfferingCreated_v1
        return offering;
    }

    public async publishOffering(context: IdentityContext, offering: CourseOffering): Promise<void> {
        this.enforcePermission(context);
        offering.changeStatus(CourseOfferingStatus.Published);
        // Emit CourseOfferingPublished_v1
    }

    public async assignLecturer(
        context: IdentityContext,
        offering: CourseOffering,
        lecturerId: string,
        teachingRole: string,
        creditLoad: number,
        isCoordinator: boolean
    ): Promise<void> {
        this.enforcePermission(context);
        const assignment = LecturerAssignment.create(lecturerId, teachingRole, creditLoad, isCoordinator);
        offering.assignLecturer(assignment);
        // Emit LecturerAssigned_v1
    }

    public async assignSchedule(
        context: IdentityContext,
        offering: CourseOffering,
        dayOfWeek: number,
        startTime: string,
        endTime: string,
        roomId: string
    ): Promise<void> {
        this.enforcePermission(context);
        const schedule = ClassSchedule.create(dayOfWeek, startTime, endTime, roomId);
        offering.assignSchedule(schedule);
        // Emit ScheduleAssigned_v1
    }

    private enforcePermission(context: IdentityContext): void {
        if (!context.permissions.includes('academic.offering.manage')) {
            throw new Error('Forbidden: Missing academic.offering.manage permission');
        }
    }
}
