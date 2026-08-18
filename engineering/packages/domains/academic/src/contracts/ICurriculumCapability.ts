import { IdentityContext } from '@campus-os/identity/src/contracts';

export interface ICurriculumCapability {
    createCurriculum(
        context: IdentityContext,
        studyProgramId: string,
        version: string,
        effectiveAcademicYearId: string,
        totalCreditsRequired: number
    ): Promise<string>;

    activateCurriculum(context: IdentityContext, curriculumId: string): Promise<void>;
    
    archiveCurriculum(context: IdentityContext, curriculumId: string): Promise<void>;
    
    assignCourse(
        context: IdentityContext,
        curriculumId: string,
        courseId: string,
        semesterRecommendation: number,
        isMandatory: boolean,
        minimumGrade: string,
        sequence: number
    ): Promise<void>;
}
