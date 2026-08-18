import { IdentityContext } from '@campus-os/identity/src/contracts';
import { CourseType } from '../domain/entities/CourseType';
import { EducationLevel } from '../domain/entities/EducationLevel';

export interface ICourseCatalogCapability {
    createCourse(
        context: IdentityContext,
        courseCode: string,
        name: string,
        credits: number,
        educationLevel: EducationLevel,
        courseType: CourseType,
        isShared: boolean,
        metadata?: any
    ): Promise<string>;

    updateCourse(context: IdentityContext, courseId: string, name: string, credits: number, metadata?: any): Promise<void>;
    
    archiveCourse(context: IdentityContext, courseId: string): Promise<void>;

    definePrerequisite(context: IdentityContext, courseId: string, requiredCourseId: string, minGrade: string, concurrent: boolean): Promise<string>;
}
