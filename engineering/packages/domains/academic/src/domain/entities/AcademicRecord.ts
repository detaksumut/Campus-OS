import { StudentStatus } from './StudentStatus';

export class AcademicRecord {
    constructor(
        public readonly id: string, // Snapshot ID
        public readonly studentId: string,
        public readonly academicTermId: string,
        public readonly status: StudentStatus,
        public readonly studyProgramId: string,
        public readonly curriculumVersion: string,
        public readonly semesterNumber: number,
        public readonly gpaSnapshot: number, // IPK
        public readonly gpaTerm: number, // IPS
        public readonly creditsEarned: number // SKS Diperoleh
    ) {}

    public static createSnapshot(
        studentId: string,
        academicTermId: string,
        status: StudentStatus,
        studyProgramId: string,
        curriculumVersion: string,
        semesterNumber: number,
        gpaSnapshot: number,
        gpaTerm: number,
        creditsEarned: number
    ): AcademicRecord {
        const id = `REC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        return new AcademicRecord(
            id,
            studentId,
            academicTermId,
            status,
            studyProgramId,
            curriculumVersion,
            semesterNumber,
            gpaSnapshot,
            gpaTerm,
            creditsEarned
        );
    }
}
