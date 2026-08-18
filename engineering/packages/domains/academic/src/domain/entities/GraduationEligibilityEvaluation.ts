import { EligibilityStatus } from './EligibilityStatus';
import { AcademicSnapshot } from './AcademicSnapshot';
import { StudentClearanceRecord } from './StudentClearanceRecord';

export class RequirementResult {
    constructor(
        public readonly requirementName: string,
        public readonly isMet: boolean,
        public readonly reason?: string
    ) {}
}

export class GraduationEligibilityEvaluation {
    constructor(
        public readonly evaluationId: string,
        public readonly studentId: string,
        public readonly evaluationVersion: number,
        public readonly evaluatedAt: Date,
        public readonly academicSnapshot: AcademicSnapshot,
        public readonly requirementResults: RequirementResult[],
        public readonly clearanceSnapshots: StudentClearanceRecord[],
        public status: EligibilityStatus
    ) {}

    public canProceedToYudisium(): boolean {
        return this.status === EligibilityStatus.Eligible;
    }
}
