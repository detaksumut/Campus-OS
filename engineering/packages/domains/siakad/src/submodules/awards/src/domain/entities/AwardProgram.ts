import { AwardId, NominationId } from '../value-objects/AwardsValueObjects';
import { AwardCategory, AwardCycle, AwardStatus, AwardDecisionType } from '../types/AwardsEnums';
import { AwardNomination } from './AwardNomination';
import { AwardCommittee } from './AwardCommittee';
import { EvaluationSession } from './EvaluationSession';
import { AwardDecision } from './AwardDecision';
import { AwardRecipient } from './AwardRecipient';

export class AwardProgram {
  private nominations: AwardNomination[] = [];
  private committee: AwardCommittee[] = [];
  private evaluations: EvaluationSession[] = [];
  private decisions: AwardDecision[] = [];
  private recipients: AwardRecipient[] = [];

  constructor(
    private readonly awardId: AwardId,
    private name: string,
    private category: AwardCategory,
    private cycle: AwardCycle,
    private allowSelfNomination: boolean = false,
    private status: AwardStatus = AwardStatus.DRAFT
  ) {}

  get id(): AwardId { return this.awardId; }
  get currentName(): string { return this.name; }
  get currentCategory(): AwardCategory { return this.category; }
  get currentCycle(): AwardCycle { return this.cycle; }
  get canSelfNominate(): boolean { return this.allowSelfNomination; }
  get currentStatus(): AwardStatus { return this.status; }

  get allNominations(): AwardNomination[] { return this.nominations; }
  get allCommittee(): AwardCommittee[] { return this.committee; }
  get allEvaluations(): EvaluationSession[] { return this.evaluations; }
  get allDecisions(): AwardDecision[] { return this.decisions; }
  get allRecipients(): AwardRecipient[] { return this.recipients; }

  addCommitteeMember(member: AwardCommittee): void {
    this.committee.push(member);
  }

  submitNomination(nomination: AwardNomination): void {
    if (this.status !== AwardStatus.NOMINATION_OPEN) {
      throw new Error('Nominations can only be submitted during the NOMINATION_OPEN phase.');
    }
    this.nominations.push(nomination);
  }

  recordEvaluation(evaluation: EvaluationSession): void {
    if (this.status !== AwardStatus.EVALUATION_PHASE) {
      throw new Error('Evaluations can only be recorded during the EVALUATION_PHASE.');
    }
    this.evaluations.push(evaluation);
  }

  recordDecision(decision: AwardDecision): void {
    if (this.status !== AwardStatus.EVALUATION_PHASE && this.status !== AwardStatus.DECIDED) {
      throw new Error('Decisions can only be recorded during evaluation or decided phase.');
    }
    this.decisions.push(decision);
    
    // Automatically confer recipient if WINNER
    if (decision.currentDecision === AwardDecisionType.WINNER) {
      const nom = this.nominations.find(n => n.id.getValue() === decision.nomination.getValue());
      if (nom) {
        this.recipients.push(new AwardRecipient(this.awardId, nom.nominee, new Date()));
      }
    }
  }

  openNominations(): void {
    if (this.status !== AwardStatus.DRAFT) throw new Error('Can only open nominations from DRAFT state.');
    this.status = AwardStatus.NOMINATION_OPEN;
  }

  startEvaluationPhase(): void {
    if (this.status !== AwardStatus.NOMINATION_OPEN) throw new Error('Can only start evaluation after nominations.');
    this.status = AwardStatus.EVALUATION_PHASE;
  }

  finalizeDecisions(): void {
    if (this.status !== AwardStatus.EVALUATION_PHASE) throw new Error('Can only finalize decisions after evaluation.');
    this.status = AwardStatus.DECIDED;
  }

  publishResults(): void {
    if (this.status !== AwardStatus.DECIDED) throw new Error('Can only publish after decisions are finalized.');
    this.status = AwardStatus.PUBLISHED;
  }
}
