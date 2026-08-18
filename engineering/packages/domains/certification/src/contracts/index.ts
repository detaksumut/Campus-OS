export type SchemeStatus = 'Draft' | 'Active' | 'Deprecated';
export type RuleOperator = 'ALL' | 'ANY' | 'NOT';
export type AssessmentMethod = 'Exam' | 'Interview' | 'Portfolio' | 'Experience' | 'CPD' | 'Simulation';
export type GradingMethod = 'Numeric' | 'PassFail' | 'Rubric' | 'Weighted';

// ─── Rule Evidence ──────────────────────────────────────────────────────────

export interface RuleEvidence {
  status: boolean;
  evidence: Record<string, unknown>;
  source: string;
  sourceVersion: string;
  ruleId: string;
  timestamp: string;
}

export interface RuleEvaluationResult {
  ruleId: string;
  ruleName: string;
  passed: boolean;
  message: string;
  evidence?: RuleEvidence;
}

// ─── Prerequisite Rules ─────────────────────────────────────────────────────

export interface SimplePrerequisiteRule {
  id: string;
  name: string;
  type: 'SIMPLE';
  priority: number;
  providerId: string;
  condition: string;
  metric: string;
  operator: '>=' | '<=' | '==' | '!=' | '>' | '<';
  threshold: string | number;
}

export interface CompositePrerequisiteRule {
  id: string;
  name: string;
  type: 'COMPOSITE';
  priority: number;
  operator: RuleOperator;
  rules: PrerequisiteRule[];
}

export type PrerequisiteRule = SimplePrerequisiteRule | CompositePrerequisiteRule;

// ─── Scheme ─────────────────────────────────────────────────────────────────

export interface SchemeAssessmentComponent {
  method: AssessmentMethod;
  weight: number;
  required: boolean;
  passingThreshold: number;
  maxAttempts: number;
  gradingMethod: GradingMethod;
}

export interface SchemeRenewalPolicy {
  validityMonths: number;
  cpd: SimplePrerequisiteRule[];
  prerequisites: PrerequisiteRule;
}

export interface CertificationScheme {
  schemeId: string;
  name: string;
  description: string;
  version: string;
  status: SchemeStatus;
  applicationPrerequisites: PrerequisiteRule;
  assessmentComponents: SchemeAssessmentComponent[];
  renewalPolicy: SchemeRenewalPolicy;
  createdAt: number;
  activatedAt?: number;
}

export interface ISchemeRuntime {
  createScheme(scheme: Omit<CertificationScheme, 'schemeId' | 'createdAt'>): Promise<string>;
  activateScheme(schemeId: string): Promise<void>;
  deprecateScheme(schemeId: string): Promise<void>;
  getScheme(schemeId: string): Promise<CertificationScheme | null>;
  getActiveSchemes(): Promise<CertificationScheme[]>;
}

// ─── Applicant ───────────────────────────────────────────────────────────────

export type ApplicantLifecycle = 'Created' | 'Active' | 'Inactive' | 'Archived';

export interface ApplicantProfile {
  preferredName: string;
  currentInstitution: string;
  currentRole: string;
  areaOfExpertise: string[];
}

export interface ApplicantDto {
  applicantId: string;
  membershipId: string;
  profile: ApplicantProfile;
  lifecycleState: ApplicantLifecycle;
}

export interface IApplicantRuntime {
  createApplicant(membershipId: string, profile: ApplicantProfile): Promise<string>;
  getApplicant(applicantId: string): Promise<ApplicantDto | null>;
  getApplicantByMembership(membershipId: string): Promise<ApplicantDto | null>;
  activate(applicantId: string): Promise<void>;
  archive(applicantId: string): Promise<void>;
}

// ─── Application ─────────────────────────────────────────────────────────────

export type ApplicationState =
  | 'Draft' | 'Submitted' | 'Under Review'
  | 'Eligible' | 'Conditionally Eligible' | 'Ineligible' | 'Withdrawn';

export type EligibilityOutcome = 'Eligible' | 'Conditionally Eligible' | 'Ineligible';
export type ConditionalRequirementStatus = 'Pending' | 'Fulfilled' | 'Verified';

export interface ConditionalRequirement {
  requirementId: string;
  description: string;
  ruleId: string;
  status: ConditionalRequirementStatus;
  dueDate?: number;
  fulfilledAt?: number;
  verifiedAt?: number;
  verifiedBy?: string;
  verificationComment?: string;
}

export interface ApplicationDto {
  applicationId: string;
  schemeId: string;
  applicantId: string;
  membershipId: string;
  state: ApplicationState;
  eligibilityOutcome?: EligibilityOutcome;
  conditionalRequirements: ConditionalRequirement[];
  submittedAt?: number;
  reviewedAt?: number;
  decidedAt?: number;
}

export interface IApplicationRuntime {
  createDraft(schemeId: string, applicantId: string, membershipId: string): Promise<string>;
  submit(applicationId: string): Promise<void>;
  beginReview(applicationId: string): Promise<void>;
  recordEligibility(applicationId: string, outcome: EligibilityOutcome, conditions?: ConditionalRequirement[]): Promise<void>;
  fulfillCondition(applicationId: string, requirementId: string): Promise<void>;
  verifyCondition(applicationId: string, requirementId: string, verifiedBy: string, comment?: string): Promise<void>;
  withdraw(applicationId: string): Promise<void>;
  getApplication(applicationId: string): Promise<ApplicationDto | null>;
}

// ─── Assessment Component Abstraction ────────────────────────────────────────

export type ComponentStatus = 'Passed' | 'Failed' | 'Deferred' | 'Pending';
export type ComponentState = 'Scheduled' | 'In Progress' | 'Completed' | 'Graded' | 'Evaluated' | 'Cancelled';

export interface ComponentScore {
  raw: number;
  max: number;
  percentage: number;
  passed: boolean;
  gradedAt: number;
  gradedBy: string;
}

export interface AssessmentResult {
  componentType: AssessmentMethod;
  componentId: string;
  score: ComponentScore | null;
  status: ComponentStatus;
  recommendation: 'Pass' | 'Fail' | 'Defer';
  completedAt: number;
}

export interface IAssessmentComponent {
  readonly componentType: AssessmentMethod;
  getResult(applicationId: string): Promise<AssessmentResult | null>;
  isMandatory(scheme: CertificationScheme): boolean;
  hasPassedThreshold(scheme: CertificationScheme, applicationId: string): Promise<boolean>;
}

// ─── Exam ────────────────────────────────────────────────────────────────────

export type ExamLifecycle = 'Scheduled' | 'In Progress' | 'Completed' | 'Graded' | 'Cancelled';

export interface ExamAttempt {
  attemptNumber: number;
  scheduledAt: number;
  startedAt?: number;
  completedAt?: number;
  score?: ComponentScore;
}

export interface ExamDto {
  examId: string;
  applicationId: string;
  schemeId: string;
  applicantId: string;
  state: ExamLifecycle;
  currentAttempt: number;
  maxAttempts: number;
  attempts: ExamAttempt[];
  passingThreshold: number;
}

export interface IExamRuntime extends IAssessmentComponent {
  scheduleExam(applicationId: string, schemeId: string, applicantId: string): Promise<string>;
  startExam(examId: string): Promise<void>;
  completeExam(examId: string): Promise<void>;
  gradeExam(examId: string, rawScore: number, maxScore: number, gradedBy: string): Promise<void>;
  reschedule(examId: string): Promise<void>;
  cancel(examId: string): Promise<void>;
  getExam(examId: string): Promise<ExamDto | null>;
  getByApplication(applicationId: string): Promise<ExamDto | null>;
}

// ─── Interview ───────────────────────────────────────────────────────────────

export type InterviewLifecycle = 'Scheduled' | 'Conducted' | 'Evaluated' | 'Cancelled';

export interface InterviewEvaluation {
  scores: Record<string, number>;
  strengths: string;
  weaknesses: string;
  comments: string;
  recommendation: 'Pass' | 'Fail' | 'Defer';
  evaluatedAt: number;
  evaluatedBy: string;
}

export interface InterviewDto {
  interviewId: string;
  applicationId: string;
  schemeId: string;
  applicantId: string;
  interviewerId: string;
  scheduledAt: number;
  conductedAt?: number;
  state: InterviewLifecycle;
  evaluation?: InterviewEvaluation;
}

export interface IInterviewRuntime extends IAssessmentComponent {
  scheduleInterview(applicationId: string, schemeId: string, applicantId: string, interviewerId: string, scheduledAt: number): Promise<string>;
  conductInterview(interviewId: string): Promise<void>;
  evaluateInterview(interviewId: string, evaluation: InterviewEvaluation): Promise<void>;
  cancel(interviewId: string): Promise<void>;
  getInterview(interviewId: string): Promise<InterviewDto | null>;
  getByApplication(applicationId: string): Promise<InterviewDto | null>;
}

// ─── Assessment ───────────────────────────────────────────────────────────────

export type AssessmentStatus = 'In Progress' | 'Completed';

export interface AssessmentDto {
  assessmentId: string;
  applicationId: string;
  schemeId: string;
  state: AssessmentStatus;
  componentResults: AssessmentResult[];
  overallScore: number;
  overallPassed: boolean;
  completedAt?: number;
}

export interface IAssessmentRuntime {
  openAssessment(applicationId: string, schemeId: string): Promise<string>;
  recordComponentResult(assessmentId: string, result: AssessmentResult): Promise<void>;
  completeAssessment(assessmentId: string): Promise<void>;
  getAssessment(assessmentId: string): Promise<AssessmentDto | null>;
  getByApplication(applicationId: string): Promise<AssessmentDto | null>;
}

// ─── Certification Decision ───────────────────────────────────────────────────

export type CertificationDecisionType = 'Certified' | 'Failed' | 'Deferred';

export interface CertificationDecisionDto {
  decisionId: string;
  applicationId: string;
  assessmentId: string;
  schemeId: string;
  decision: CertificationDecisionType;
  reason: string;
  committeeComment: string;
  issuedBy: string;
  issuedAt: number;
  componentSummary: AssessmentResult[];
}

export interface ICertificationDecisionRuntime {
  issueDecision(
    applicationId: string,
    assessmentId: string,
    schemeId: string,
    decision: CertificationDecisionType,
    reason: string,
    committeeComment: string,
    issuedBy: string
  ): Promise<string>;
  getDecision(decisionId: string): Promise<CertificationDecisionDto | null>;
  getByApplication(applicationId: string): Promise<CertificationDecisionDto | null>;
}
