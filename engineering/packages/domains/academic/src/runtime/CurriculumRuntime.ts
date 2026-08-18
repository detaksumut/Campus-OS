import { IdentityContext } from '@campus-os/identity/src/contracts';
import { CourseCatalogService } from './services/CourseCatalogService';
import { CurriculumService } from './services/CurriculumService';
import { Course } from '../domain/entities/Course';
import { Curriculum } from '../domain/entities/Curriculum';
import { CourseType } from '../domain/entities/CourseType';
import { EducationLevel } from '../domain/entities/EducationLevel';

export class CurriculumRuntime {
    constructor(
        private readonly courseCatalogService: CourseCatalogService,
        private readonly curriculumService: CurriculumService
    ) {}

    // Course Catalog Delegation
    public async createCourse(
        context: IdentityContext,
        courseCode: string, name: string, credits: number,
        educationLevel: EducationLevel, courseType: CourseType, isShared: boolean, metadata?: any
    ): Promise<Course> {
        return this.courseCatalogService.createCourse(context, courseCode, name, credits, educationLevel, courseType, isShared, metadata);
    }

    public async definePrerequisite(context: IdentityContext, course: Course, requiredCourseId: string, minGrade: string, concurrent: boolean) {
        return this.courseCatalogService.definePrerequisite(context, course, requiredCourseId, minGrade, concurrent);
    }

    // Curriculum Delegation
    public async createCurriculum(
        context: IdentityContext, studyProgramId: string, version: string, effectiveYear: string, totalCredits: number
    ): Promise<Curriculum> {
        return this.curriculumService.createCurriculum(context, studyProgramId, version, effectiveYear, totalCredits);
    }

    public async activateCurriculum(context: IdentityContext, curriculum: Curriculum): Promise<void> {
        return this.curriculumService.activateCurriculum(context, curriculum);
    }

    public async assignCourse(
        context: IdentityContext, curriculum: Curriculum, courseId: string, 
        semRec: number, isMandatory: boolean, minGrade: string, seq: number
    ) {
        return this.curriculumService.assignCourseToCurriculum(context, curriculum, courseId, semRec, isMandatory, minGrade, seq);
    }
}
