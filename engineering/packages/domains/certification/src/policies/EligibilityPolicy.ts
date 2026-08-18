import { ApplicationDto, EligibilityOutcome, ConditionalRequirement } from '../contracts';
import { PrerequisiteEngine, EligibilityContext } from './PrerequisiteEngine';
import { ISchemeRuntime, ApplicationState } from '../contracts';

export class EligibilityPolicy {
  constructor(
    private engine: PrerequisiteEngine,
    private schemeRuntime: ISchemeRuntime
  ) {}

  async determineEligibility(
    application: ApplicationDto
  ): Promise<{ outcome: EligibilityOutcome; conditions: ConditionalRequirement[] }> {
    const scheme = await this.schemeRuntime.getScheme(application.schemeId);
    if (!scheme) throw new Error(`Scheme '${application.schemeId}' not found`);

    const context: EligibilityContext = {
      membershipId: application.membershipId,
      applicantId: application.applicantId,
      applicationId: application.applicationId,
      schemeId: application.schemeId
    };

    const report = await this.engine.evaluate(scheme.applicationPrerequisites, context);

    if (report.overallPassed) {
      return { outcome: 'Eligible', conditions: [] };
    }

    // Determine if conditionally eligible: only soft requirements failed
    const failedRules = report.results.filter(r => !r.passed && !r.ruleId.includes('COMPOSITE'));
    const conditions: ConditionalRequirement[] = failedRules.map(r => ({
      description: r.message,
      ruleId: r.ruleId,
      status: 'Pending'
    }));

    // If ALL hard (priority 1) rules passed but soft rules failed → Conditionally Eligible
    // For now, any failure = Conditionally Eligible with conditions; no rules at all passed = Ineligible
    const anyPassed = report.results.some(r => r.passed);
    const outcome: EligibilityOutcome = anyPassed ? 'Conditionally Eligible' : 'Ineligible';

    return { outcome, conditions };
  }

  validateTransition(current: ApplicationState, target: ApplicationState): void {
    const allowed: Record<ApplicationState, ApplicationState[]> = {
      'Draft':                    ['Submitted', 'Withdrawn'],
      'Submitted':                ['Under Review', 'Withdrawn'],
      'Under Review':             ['Eligible', 'Conditionally Eligible', 'Ineligible'],
      'Eligible':                 [],
      'Conditionally Eligible':   ['Eligible', 'Ineligible'],
      'Ineligible':               [],
      'Withdrawn':                []
    };
    if (!allowed[current]?.includes(target)) {
      throw new Error(`Invalid application transition: '${current}' → '${target}'`);
    }
  }
}
