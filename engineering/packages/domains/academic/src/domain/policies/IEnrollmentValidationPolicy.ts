import { Enrollment } from '../entities/Enrollment';

export interface ValidationResult {
    isValid: boolean;
    reason?: string;
}

export interface IEnrollmentValidationPolicy {
    validate(studentId: string, offeringId: string, currentEnrollment: Enrollment): Promise<ValidationResult>;
}
