import { IEnrollmentValidationPolicy, ValidationResult } from './IEnrollmentValidationPolicy';
import { Enrollment } from '../entities/Enrollment';

export class CreditLimitPolicy implements IEnrollmentValidationPolicy {
    // Dynamic policy based on previous GPA/IPS (Indeks Prestasi Semester)
    // Could inject a provider to get IPS, or take it as context
    constructor(private readonly getPreviousSemesterIPS: (studentId: string) => Promise<number>) {}

    public async validate(studentId: string, offeringId: string, currentEnrollment: Enrollment): Promise<ValidationResult> {
        const ips = await this.getPreviousSemesterIPS(studentId);
        
        let maxCredits = 18;
        if (ips >= 3.00) {
            maxCredits = 24;
        } else if (ips >= 2.50) {
            maxCredits = 21;
        }

        // Logic to sum credits of currentEnrollment items + offeringId
        // In a real implementation, we would query the CourseCatalogProvider to get the credits for each offering
        const currentCredits = 0; 
        const offeringCredits = 3;

        if (currentCredits + offeringCredits > maxCredits) {
            return { isValid: false, reason: `Credit limit exceeded. Max allowed: ${maxCredits}` };
        }

        return { isValid: true };
    }
}
