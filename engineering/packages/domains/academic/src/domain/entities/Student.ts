import { StudentStatus } from './StudentStatus';
import { EducationLevel } from './EducationLevel';

export class Student {
    constructor(
        public readonly id: string, // Immutable Student ID (e.g. STU-xxxx)
        public readonly identityUserId: string, // Link to Identity Core (SSO)
        public studyProgramId: string,
        public readonly entryAcademicYearId: string,
        public currentStatus: StudentStatus,
        public currentAcademicTermId: string,
        public readonly cohort: string, // e.g. "2026"
        public readonly educationLevel: EducationLevel,
        public readonly admissionPath: string, // e.g. "SNMPTN"
        public organizationUnitId: string // The overarching org unit this student belongs to
    ) {}

    public static register(
        identityUserId: string,
        studyProgramId: string,
        entryAcademicYearId: string,
        currentAcademicTermId: string,
        cohort: string,
        educationLevel: EducationLevel,
        admissionPath: string,
        organizationUnitId: string
    ): Student {
        const id = `STU-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const initialStatus = StudentStatus.createRegistered(currentAcademicTermId);
        return new Student(
            id,
            identityUserId,
            studyProgramId,
            entryAcademicYearId,
            initialStatus,
            currentAcademicTermId,
            cohort,
            educationLevel,
            admissionPath,
            organizationUnitId
        );
    }

    public changeStatus(newStatus: StudentStatus, newTermId: string): void {
        this.currentStatus = newStatus;
        this.currentAcademicTermId = newTermId;
    }
}
