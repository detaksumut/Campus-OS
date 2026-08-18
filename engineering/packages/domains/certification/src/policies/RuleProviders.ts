import { IRuleProvider, RuleEvaluationResult, EligibilityContext } from './PrerequisiteEngine';
import { SimplePrerequisiteRule, RuleEvidence } from '../contracts';

function buildEvidence(status: boolean, evidence: Record<string, unknown>, source: string): RuleEvidence {
  return { status, evidence, source, timestamp: new Date().toISOString() };
}

function compare(a: number, op: string, b: number): boolean {
  switch (op) {
    case '>=': return a >= b;
    case '<=': return a <= b;
    case '==': return a === b;
    case '>': return a > b;
    case '<': return a < b;
    case '!=': return a !== b;
    default: return false;
  }
}

export class MembershipRuleProvider implements IRuleProvider {
  readonly providerId = 'membership';

  constructor(
    private membershipLookup: { getMembershipStatus(id: string): Promise<{ status: string } | null> },
    private tierLookup: { getActiveTier(id: string): Promise<{ tierName: string; tierLevel: number } | null> }
  ) {}

  async evaluate(rule: SimplePrerequisiteRule, ctx: EligibilityContext): Promise<RuleEvaluationResult> {
    const base = { ruleId: rule.id, ruleName: rule.name };
    const tierMap: Record<string, number> = { 'Basic': 1, 'Premium': 2, 'Scholar': 3 };

    if (rule.metric === 'verificationStatus') {
      const status = await this.membershipLookup.getMembershipStatus(ctx.membershipId);
      const passed = status?.status === 'Active';
      const ev = buildEvidence(passed, { status: status?.status }, 'Membership v1.0');
      return { ...base, passed, message: `Membership status '${status?.status}': ${passed ? 'PASS' : 'FAIL'}`, evidence: ev };
    }

    if (rule.metric === 'tier') {
      const tier = await this.tierLookup.getActiveTier(ctx.membershipId);
      const a = tierMap[tier?.tierName || 'Basic'] || 0;
      const b = tierMap[rule.threshold as string] || 0;
      const passed = compare(a, rule.operator, b);
      const ev = buildEvidence(passed, { tierName: tier?.tierName, tierLevel: a }, 'Membership v1.0');
      return { ...base, passed, message: `Tier '${tier?.tierName}' ${rule.operator} '${rule.threshold}': ${passed ? 'PASS' : 'FAIL'}`, evidence: ev };
    }

    return { ...base, passed: false, message: `Unknown membership metric: '${rule.metric}'` };
  }
}

export class PublicationRuleProvider implements IRuleProvider {
  readonly providerId = 'publication';

  constructor(private publicationLookup: { getPublicationCountByAuthor(id: string): Promise<number> }) {}

  async evaluate(rule: SimplePrerequisiteRule, ctx: EligibilityContext): Promise<RuleEvaluationResult> {
    const base = { ruleId: rule.id, ruleName: rule.name };

    if (rule.metric === 'publicationCount') {
      const count = await this.publicationLookup.getPublicationCountByAuthor(ctx.membershipId);
      const passed = compare(count, rule.operator, Number(rule.threshold));
      const ev = buildEvidence(passed, { publicationCount: count }, 'Publication v1.0');
      return { ...base, passed, message: `Publication count: ${count} ${rule.operator} ${rule.threshold}: ${passed ? 'PASS' : 'FAIL'}`, evidence: ev };
    }

    return { ...base, passed: false, message: `Unknown publication metric: '${rule.metric}'` };
  }
}

export class ConferenceRuleProvider implements IRuleProvider {
  readonly providerId = 'conference';

  constructor(private conferenceLookup: { getAttendanceCount(id: string): Promise<number> }) {}

  async evaluate(rule: SimplePrerequisiteRule, ctx: EligibilityContext): Promise<RuleEvaluationResult> {
    const base = { ruleId: rule.id, ruleName: rule.name };

    if (rule.metric === 'conferenceAttendance') {
      const count = await this.conferenceLookup.getAttendanceCount(ctx.membershipId);
      const passed = compare(count, rule.operator, Number(rule.threshold));
      const ev = buildEvidence(passed, { attendanceCount: count }, 'Conference v1.0');
      return { ...base, passed, message: `Conference attendance: ${count} ${rule.operator} ${rule.threshold}: ${passed ? 'PASS' : 'FAIL'}`, evidence: ev };
    }

    return { ...base, passed: false, message: `Unknown conference metric: '${rule.metric}'` };
  }
}
