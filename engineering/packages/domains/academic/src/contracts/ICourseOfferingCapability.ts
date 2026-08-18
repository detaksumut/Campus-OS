import { IdentityContext } from '@campus-os/identity/src/contracts';

export interface ICourseOfferingCapability {
    createOffering(
        context: IdentityContext,
        offeringCode: string,
        courseId: string,
        academicTermId: string,
        hostStudyProgramId: string,
        curriculumCourseId: string | null,
        quota: number
    ): Promise<string>;

    publishOffering(context: IdentityContext, offeringId: string): Promise<void>;

    assignLecturer(
        context: IdentityContext,
        offeringId: string,
        lecturerId: string,
        teachingRole: string,
        creditLoad: number,
        isCoordinator: boolean
    ): Promise<void>;

    assignSchedule(
        context: IdentityContext,
        offeringId: string,
        dayOfWeek: number,
        startTime: string,
        endTime: string,
        roomId: string
    ): Promise<void>;
}
