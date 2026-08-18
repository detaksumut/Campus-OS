import { YudisiumSessionStatus } from './YudisiumSessionStatus';
import { GraduationDecision } from './GraduationDecision';
import { GraduationDecisionStatus } from './GraduationDecisionStatus';
import { DegreeAwardSnapshot } from './DegreeAwardSnapshot';

export class YudisiumSession {
    constructor(
        public readonly sessionId: string,
        public readonly academicTermId: string,
        public readonly sessionName: string,
        public readonly scheduledAt: Date,
        public status: YudisiumSessionStatus,
        public decisions: GraduationDecision[] = []
    ) {}

    public openSession(): void {
        if (this.status !== YudisiumSessionStatus.Draft) {
            throw new Error("Only Draft sessions can be Opened.");
        }
        this.status = YudisiumSessionStatus.Open;
    }

    public startDeliberation(): void {
        if (this.status !== YudisiumSessionStatus.Open) {
            throw new Error("Only Open sessions can start Deliberation.");
        }
        this.status = YudisiumSessionStatus.InDeliberation;
    }

    public recordDecision(
        decisionId: string,
        studentId: string, 
        eligibilityEvaluationId: string,
        decisionStatus: GraduationDecisionStatus,
        degreeAward: DegreeAwardSnapshot | null,
        decidedBy: string,
        reason: string | null = null
    ): void {
        if (this.status !== YudisiumSessionStatus.InDeliberation) {
            throw new Error("Decisions can only be recorded during InDeliberation phase.");
        }

        const existingIndex = this.decisions.findIndex(d => d.studentId === studentId);
        const decision = new GraduationDecision(
            decisionId,
            studentId,
            eligibilityEvaluationId,
            decisionStatus,
            degreeAward,
            new Date(),
            decidedBy,
            reason
        );

        if (existingIndex >= 0) {
            this.decisions[existingIndex] = decision;
        } else {
            this.decisions.push(decision);
        }
    }

    public finalizeSession(): void {
        if (this.status !== YudisiumSessionStatus.InDeliberation) {
            throw new Error("Only sessions InDeliberation can be Finalized.");
        }
        this.status = YudisiumSessionStatus.Finalized;
    }
}
