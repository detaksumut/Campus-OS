import { AcademicSnapshot } from '../entities/AcademicSnapshot';
import { StudentClearanceRecord } from '../entities/StudentClearanceRecord';
import { RequirementResult } from '../entities/GraduationEligibilityEvaluation';

export interface IGraduationRequirementPolicy {
    /**
     * Evaluates if a student meets all graduation requirements based on their academic and clearance snapshots.
     */
    evaluateRequirements(
        academicSnapshot: AcademicSnapshot,
        clearances: StudentClearanceRecord[]
    ): RequirementResult[];
}
