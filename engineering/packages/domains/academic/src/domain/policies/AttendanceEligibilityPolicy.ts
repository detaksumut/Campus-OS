import { IEnrollmentProvider } from '../../contracts/IEnrollmentProvider';

export class AttendanceEligibilityPolicy {
    constructor(private readonly enrollmentProvider: IEnrollmentProvider) {}

    public async checkEligibility(offeringId: string, studentId: string): Promise<{ isEligible: boolean, enrollmentItemId?: string }> {
        // Gets enrolled students for this offering, which should also return their enrollmentItemIds
        const enrolledStudents = await this.enrollmentProvider.getEnrolledStudents(offeringId);
        
        // In a real implementation, getEnrolledStudents might return complex objects like { studentId, enrollmentItemId }
        // For the sake of this policy, we'll pretend we get the mapping.
        // If enrolledStudents is just a string array of student IDs:
        if (enrolledStudents.includes(studentId)) {
            // Hardcode or lookup enrollmentItemId
            return { isEligible: true, enrollmentItemId: `ENI-${studentId}-${offeringId}` };
        }
        
        return { isEligible: false };
    }
}
