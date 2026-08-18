import { IdentityContext } from '@campus-os/identity/src/contracts';
import { CourseOfferingService } from './services/CourseOfferingService';
import { CourseOffering } from '../domain/entities/CourseOffering';

export class CourseOfferingRuntime {
    constructor(
        private readonly courseOfferingService: CourseOfferingService
    ) {}

    public async createOffering(
        context: IdentityContext,
        offeringCode: string,
        courseId: string,
        academicTermId: string,
        hostStudyProgramId: string,
        curriculumCourseId: string | null,
        quota: number
    ): Promise<CourseOffering> {
        return this.courseOfferingService.createOffering(context, offeringCode, courseId, academicTermId, hostStudyProgramId, curriculumCourseId, quota);
    }

    public async publishOffering(context: IdentityContext, offering: CourseOffering): Promise<void> {
        return this.courseOfferingService.publishOffering(context, offering);
    }

    public async assignLecturer(
        context: IdentityContext,
        offering: CourseOffering,
        lecturerId: string,
        teachingRole: string,
        creditLoad: number,
        isCoordinator: boolean
    ): Promise<void> {
        return this.courseOfferingService.assignLecturer(context, offering, lecturerId, teachingRole, creditLoad, isCoordinator);
    }

    public async assignSchedule(
        context: IdentityContext,
        offering: CourseOffering,
        dayOfWeek: number,
        startTime: string,
        endTime: string,
        roomId: string
    ): Promise<void> {
        return this.courseOfferingService.assignSchedule(context, offering, dayOfWeek, startTime, endTime, roomId);
    }
}
