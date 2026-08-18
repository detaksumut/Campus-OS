import { ApplicationId, ApplicantId, ProgramChoice } from '../value-objects/AdmissionsValueObjects';
import { AdmissionDecision } from '../types/AdmissionsEnums';
import { SelectionStage } from './SelectionStage';
import { EnrollmentOffer } from './EnrollmentOffer';

export class Application {
  private stages: SelectionStage[] = [];
  private offer?: EnrollmentOffer;

  constructor(
    private readonly applicationId: ApplicationId,
    private readonly applicantId: ApplicantId,
    private readonly choices: ProgramChoice[],
    private decision: AdmissionDecision = AdmissionDecision.PENDING,
    private readonly submittedAt: Date = new Date()
  ) {}

  get id(): ApplicationId { return this.applicationId; }
  get applicant(): ApplicantId { return this.applicantId; }
  get programChoices(): ProgramChoice[] { return this.choices; }
  get currentDecision(): AdmissionDecision { return this.decision; }
  get dateSubmitted(): Date { return this.submittedAt; }
  get allStages(): SelectionStage[] { return this.stages; }
  get currentOffer(): EnrollmentOffer | undefined { return this.offer; }

  addStage(stage: SelectionStage): void {
    this.stages.push(stage);
  }

  updateDecision(decision: AdmissionDecision): void {
    this.decision = decision;
  }

  issueOffer(offer: EnrollmentOffer): void {
    if (this.decision !== AdmissionDecision.PASSED) {
      throw new Error('Cannot issue offer unless applicant has passed.');
    }
    this.offer = offer;
  }
}
