import { IdentityContext } from '@campus-os/identity/src/contracts';
import { Course } from '../domain/entities/Course';
import { CourseType } from '../domain/entities/CourseType';
import { EducationLevel } from '../domain/entities/EducationLevel';
import { CoursePrerequisite, PrerequisiteRuleType } from '../domain/entities/CoursePrerequisite';

export class CourseCatalogService {
    
    public async createCourse(
        context: IdentityContext,
        courseCode: string,
        name: string,
        credits: number,
        educationLevel: EducationLevel,
        courseType: CourseType,
        isShared: boolean,
        metadata?: any
    ): Promise<Course> {
        this.enforcePermission(context);
        const course = Course.create(courseCode, name, credits, educationLevel, courseType, isShared, metadata);
        // Emit CourseCreated_v1
        return course;
    }

    public async updateCourse(context: IdentityContext, course: Course, name: string, credits: number, metadata?: any): Promise<void> {
        this.enforcePermission(context);
        course.updateDetails(name, credits, metadata);
        // Emit CourseUpdated_v1
    }

    public async archiveCourse(context: IdentityContext, course: Course): Promise<void> {
        this.enforcePermission(context);
        course.archive();
        // Emit CourseArchived_v1
    }

    public async definePrerequisite(
        context: IdentityContext,
        course: Course,
        requiredCourseId: string | null,
        minimumGrade: string | null,
        allowConcurrent: boolean
    ): Promise<CoursePrerequisite> {
        this.enforcePermission(context);
        const prereq = CoursePrerequisite.createCourseRequirement(course.courseId, requiredCourseId as string, minimumGrade as string, allowConcurrent);
        // Emit PrerequisiteDefined_v1
        return prereq;
    }

    private enforcePermission(context: IdentityContext): void {
        if (!context.permissions.includes('academic.course.manage')) {
            throw new Error('Forbidden: Missing academic.course.manage permission');
        }
    }
}
