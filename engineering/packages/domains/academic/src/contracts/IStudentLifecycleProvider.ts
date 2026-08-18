import { StudentStatus } from '../domain/entities/StudentStatus';

export interface IStudentLifecycleProvider {
    getStudentStatus(studentId: string): Promise<StudentStatus>;
    getAcademicRecord(studentId: string, termId: string): Promise<any>; // Returns readonly AcademicRecord DTO
    listActiveStudentsInProgram(studyProgramId: string, termId: string): Promise<any[]>;
    findStudentByIdentityUser(identityUserId: string): Promise<any>;
}
