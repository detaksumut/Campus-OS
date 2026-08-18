import { IdentityContext } from '@campus-os/identity/src/contracts';
import { Curriculum } from '../domain/entities/Curriculum';
import { CurriculumCourse } from '../domain/entities/CurriculumCourse';

export class CurriculumService {

    public async createCurriculum(
        context: IdentityContext,
        studyProgramId: string,
        version: string,
        effectiveAcademicYearId: string,
        totalCreditsRequired: number
    ): Promise<Curriculum> {
        this.enforcePermission(context);
        const curriculum = Curriculum.createDraft(studyProgramId, version, effectiveAcademicYearId, totalCreditsRequired);
        // Emit CurriculumCreated_v1
        return curriculum;
    }

    public async activateCurriculum(context: IdentityContext, curriculum: Curriculum): Promise<void> {
        this.enforcePermission(context);
        curriculum.activate();
        // Emit CurriculumActivated_v1
    }

    public async archiveCurriculum(context: IdentityContext, curriculum: Curriculum): Promise<void> {
        this.enforcePermission(context);
        curriculum.archive();
        // Emit CurriculumArchived_v1
    }

    public async assignCourseToCurriculum(
        context: IdentityContext,
        curriculum: Curriculum,
        courseId: string,
        semesterRecommendation: number,
        isMandatory: boolean,
        minimumGrade: string,
        sequence: number
    ): Promise<CurriculumCourse> {
        this.enforcePermission(context);
        const mapping = CurriculumCourse.assignCourse(curriculum.curriculumId, courseId, semesterRecommendation, isMandatory, minimumGrade, sequence);
        // Emit CourseAssignedToCurriculum_v1
        return mapping;
    }

    private enforcePermission(context: IdentityContext): void {
        if (!context.permissions.includes('academic.curriculum.manage')) {
            throw new Error('Forbidden: Missing academic.curriculum.manage permission');
        }
    }
}
