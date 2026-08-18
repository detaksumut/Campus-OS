import { IEnrollmentValidationPolicy, ValidationResult } from './IEnrollmentValidationPolicy';
import { Enrollment } from '../entities/Enrollment';

export class EnrollmentValidationPipeline {
    constructor(private readonly policies: IEnrollmentValidationPolicy[]) {}

    public async execute(studentId: string, offeringId: string, currentEnrollment: Enrollment): Promise<ValidationResult> {
        for (const policy of this.policies) {
            const result = await policy.validate(studentId, offeringId, currentEnrollment);
            if (!result.isValid) {
                return result; // Fast fail
            }
        }
        return { isValid: true };
    }
}
