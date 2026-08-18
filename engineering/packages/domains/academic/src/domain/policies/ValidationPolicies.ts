import { IEnrollmentValidationPolicy, ValidationResult } from './IEnrollmentValidationPolicy';
import { Enrollment } from '../entities/Enrollment';

export class AcademicStatusPolicy implements IEnrollmentValidationPolicy {
    public async validate(studentId: string, offeringId: string, currentEnrollment: Enrollment): Promise<ValidationResult> {
        // Logic to verify student is active/eligible to enroll
        return { isValid: true };
    }
}

export class CurriculumEligibilityPolicy implements IEnrollmentValidationPolicy {
    public async validate(studentId: string, offeringId: string, currentEnrollment: Enrollment): Promise<ValidationResult> {
        // Logic to verify offering belongs to student's applicable curriculum
        return { isValid: true };
    }
}

export class PrerequisitePolicy implements IEnrollmentValidationPolicy {
    public async validate(studentId: string, offeringId: string, currentEnrollment: Enrollment): Promise<ValidationResult> {
        // Logic to verify student has passed prerequisites
        return { isValid: true };
    }
}

export class ScheduleConflictPolicy implements IEnrollmentValidationPolicy {
    public async validate(studentId: string, offeringId: string, currentEnrollment: Enrollment): Promise<ValidationResult> {
        // Logic to check if offering schedule conflicts with existing items in currentEnrollment
        return { isValid: true };
    }
}

export class OfferingQuotaPolicy implements IEnrollmentValidationPolicy {
    public async validate(studentId: string, offeringId: string, currentEnrollment: Enrollment): Promise<ValidationResult> {
        // Simple check (atomic reservation handled by domain service later)
        return { isValid: true };
    }
}
