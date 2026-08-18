export interface IEnrollmentProvider {
    getEnrollment(studentId: string, academicTermId: string): Promise<any>;
    getEnrollmentById(enrollmentId: string): Promise<any>;
    getEnrolledStudents(offeringId: string): Promise<string[]>; // Returns student IDs
}
