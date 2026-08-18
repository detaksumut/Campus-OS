import { IdentityContext } from '@campus-os/identity/src/contracts';
import { StudentLifecycleService } from './services/StudentLifecycleService';
import { Student } from '../domain/entities/Student';
import { EducationLevel } from '../domain/entities/EducationLevel';
import { AcademicRecord } from '../domain/entities/AcademicRecord';

export class StudentLifecycleRuntime {
    constructor(
        private readonly studentService: StudentLifecycleService
    ) {}

    public async registerStudent(
        context: IdentityContext,
        identityUserId: string,
        studyProgramId: string,
        entryAcademicYearId: string,
        currentAcademicTermId: string,
        cohort: string,
        educationLevel: EducationLevel,
        admissionPath: string,
        organizationUnitId: string
    ): Promise<Student> {
        return this.studentService.registerStudent(
            context, identityUserId, studyProgramId, entryAcademicYearId,
            currentAcademicTermId, cohort, educationLevel, admissionPath, organizationUnitId
        );
    }

    public async activateStudent(context: IdentityContext, student: Student, termId: string): Promise<void> {
        return this.studentService.activate(context, student, termId);
    }

    public async grantLeave(context: IdentityContext, student: Student, termId: string, untilTermId: string, reason: string): Promise<void> {
        return this.studentService.leave(context, student, termId, untilTermId, reason);
    }

    public async returnFromLeave(context: IdentityContext, student: Student, termId: string): Promise<void> {
        return this.studentService.return(context, student, termId);
    }

    public async graduateStudent(context: IdentityContext, student: Student, termId: string, judiciumDate: Date): Promise<void> {
        return this.studentService.graduate(context, student, termId, judiciumDate);
    }

    public async dismissStudent(context: IdentityContext, student: Student, termId: string, reason: string): Promise<void> {
        return this.studentService.dismiss(context, student, termId, reason);
    }

    public async dropOutStudent(context: IdentityContext, student: Student, termId: string, reason: string): Promise<void> {
        return this.studentService.dropOut(context, student, termId, reason);
    }
}
