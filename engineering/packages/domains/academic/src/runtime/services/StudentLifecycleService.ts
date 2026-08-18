import { IdentityContext } from '@campus-os/identity/src/contracts';
import { Student } from '../domain/entities/Student';
import { StudentStatus } from '../domain/entities/StudentStatus';
import { EducationLevel } from '../domain/entities/EducationLevel';
import { 
    StudentRegistered_v1, 
    StudentActivated_v1, 
    StudentOnLeave_v1, 
    StudentReturned_v1, 
    StudentGraduated_v1, 
    StudentDismissed_v1, 
    StudentDroppedOut_v1 
} from '../domain/events/AcademicEvents';

export class StudentLifecycleService {

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
        this.enforcePermission(context);
        const student = Student.register(
            identityUserId, studyProgramId, entryAcademicYearId, currentAcademicTermId,
            cohort, educationLevel, admissionPath, organizationUnitId
        );
        // Emit StudentRegistered_v1
        return student;
    }

    public async activate(context: IdentityContext, student: Student, termId: string): Promise<void> {
        this.enforcePermission(context);
        const status = StudentStatus.createActive(termId);
        student.changeStatus(status, termId);
        // Emit StudentActivated_v1
    }

    public async leave(context: IdentityContext, student: Student, termId: string, untilTermId: string, reason: string): Promise<void> {
        this.enforcePermission(context);
        const status = StudentStatus.createOnLeave(termId, untilTermId, reason);
        student.changeStatus(status, termId);
        // Emit StudentOnLeave_v1
    }

    public async return(context: IdentityContext, student: Student, termId: string): Promise<void> {
        this.enforcePermission(context);
        const status = StudentStatus.createActive(termId);
        student.changeStatus(status, termId);
        // Emit StudentReturned_v1
    }

    public async graduate(context: IdentityContext, student: Student, termId: string, judiciumDate: Date): Promise<void> {
        this.enforcePermission(context);
        const status = StudentStatus.createGraduated(termId, judiciumDate);
        student.changeStatus(status, termId);
        // Emit StudentGraduated_v1
    }

    public async dismiss(context: IdentityContext, student: Student, termId: string, reason: string): Promise<void> {
        this.enforcePermission(context);
        const status = StudentStatus.createDismissed(termId, reason);
        student.changeStatus(status, termId);
        // Emit StudentDismissed_v1
    }

    public async dropOut(context: IdentityContext, student: Student, termId: string, reason: string): Promise<void> {
        this.enforcePermission(context);
        const status = StudentStatus.createDroppedOut(termId, reason);
        student.changeStatus(status, termId);
        // Emit StudentDroppedOut_v1
    }

    private enforcePermission(context: IdentityContext): void {
        if (!context.permissions.includes('academic.student.manage')) {
            throw new Error('Forbidden: Missing academic.student.manage permission');
        }
    }
}
