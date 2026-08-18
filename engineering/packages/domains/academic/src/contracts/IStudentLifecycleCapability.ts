import { IdentityContext } from '@campus-os/identity/src/contracts';
import { EducationLevel } from '../domain/entities/EducationLevel';

export interface IStudentLifecycleCapability {
    registerStudent(
        context: IdentityContext,
        identityUserId: string,
        studyProgramId: string,
        entryAcademicYearId: string,
        currentAcademicTermId: string,
        cohort: string,
        educationLevel: EducationLevel,
        admissionPath: string,
        organizationUnitId: string
    ): Promise<string>; // Returns Student ID

    activateStudent(context: IdentityContext, studentId: string, termId: string): Promise<void>;
    
    grantLeave(context: IdentityContext, studentId: string, termId: string, untilTermId: string, reason: string): Promise<void>;
    
    returnFromLeave(context: IdentityContext, studentId: string, termId: string): Promise<void>;
    
    graduateStudent(context: IdentityContext, studentId: string, termId: string, judiciumDate: Date): Promise<void>;
    
    dismissStudent(context: IdentityContext, studentId: string, termId: string, reason: string): Promise<void>;
    
    dropOutStudent(context: IdentityContext, studentId: string, termId: string, reason: string): Promise<void>;
}
