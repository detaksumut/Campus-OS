import { GraduationDecisionStatus } from './GraduationDecisionStatus';
import { DegreeAwardSnapshot } from './DegreeAwardSnapshot';

export class GraduationDecision {
    constructor(
        public readonly decisionId: string,
        public readonly studentId: string,
        public readonly eligibilityEvaluationId: string, // Link to the snapshot that justified this decision
        public status: GraduationDecisionStatus,
        public degreeAward: DegreeAwardSnapshot | null,
        public readonly decidedAt: Date,
        public readonly decidedBy: string,
        public reason: string | null = null
    ) {}
}
