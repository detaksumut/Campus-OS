import { IGraduationRequirementPolicy } from '../policies/IGraduationRequirementPolicy';
import { AcademicSnapshot } from '../entities/AcademicSnapshot';
import { StudentClearanceRecord } from '../entities/StudentClearanceRecord';
import { GraduationEligibilityEvaluation } from '../entities/GraduationEligibilityEvaluation';
import { EligibilityStatus } from '../entities/EligibilityStatus';
import { ClearanceStatus } from '../entities/ClearanceStatus';

export class GraduationEligibilityService {
    constructor(private readonly requirementPolicy: IGraduationRequirementPolicy) {}

    public evaluateEligibility(
        studentId: string,
        academicSnapshot: AcademicSnapshot,
        clearanceSnapshots: StudentClearanceRecord[],
        evaluationVersion: number
    ): GraduationEligibilityEvaluation {
        
        const results = this.requirementPolicy.evaluateRequirements(academicSnapshot, clearanceSnapshots);
        
        let status = EligibilityStatus.Eligible;

        const hasFailedRequirements = results.some(r => !r.isMet);
        
        // If there are failed academic requirements, it's strictly NotEligible.
        // If academic is fine but some clearance is Pending, it might be Conditional.
        // For simplicity in this pure service, let's say ANY unmet requirement means NotEligible,
        // UNLESS it's a specific type of clearance that allows Conditional.
        // We will delegate to the RequirementResult. But a simple fallback:
        
        if (hasFailedRequirements) {
            status = EligibilityStatus.NotEligible;
            
            // Check if it's merely a pending clearance
            const hasPendingClearance = clearanceSnapshots.some(c => c.status === ClearanceStatus.Pending);
            // In a real system, the policy would specify which failures trigger 'Conditional' vs 'NotEligible'.
            if (hasPendingClearance) {
                status = EligibilityStatus.Conditional;
            }
        }

        return new GraduationEligibilityEvaluation(
            `EVAL-${crypto.randomUUID()}`,
            studentId,
            evaluationVersion,
            new Date(),
            academicSnapshot,
            results,
            clearanceSnapshots,
            status
        );
    }
}
