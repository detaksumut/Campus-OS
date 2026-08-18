import { describe, it, expect } from 'vitest';
import { EventBus } from '@campus-os/kernel';
import { SchemeRuntime } from '../src/runtime/SchemeRuntime';
import { ApplicantRuntime } from '../src/runtime/ApplicantRuntime';
import { ApplicationRuntime } from '../src/runtime/ApplicationRuntime';
import { PrerequisiteEngine } from '../src/policies/PrerequisiteEngine';
import { MembershipRuleProvider } from '../src/policies/RuleProviders';
import { EligibilityPolicy } from '../src/policies/EligibilityPolicy';
import { PrerequisiteRule, CertificationScheme } from '../src/contracts';

// --- Mock Membership SDK ---
const mockMembershipLookup = {
  getMembershipStatus: async (id: string) => ({ status: id === 'mem_active' ? 'Active' : 'Inactive', verificationLevel: 'Verified' })
};
const mockTierLookup = {
  getActiveTier: async (_: string) => ({ tierName: 'Scholar', tierLevel: 3 })
};

// --- Scheme Definition: "Reviewer Certification" ---
const reviewerSchemePrerequisites: PrerequisiteRule = {
  id: 'root',
  name: 'Reviewer Certification Prerequisites',
  type: 'COMPOSITE',
  priority: 1,
  operator: 'ALL',
  rules: [
    {
      id: 'req-1',
      name: 'Active Membership',
      type: 'SIMPLE',
      priority: 1,
      providerId: 'membership',
      condition: 'status == Active',
      metric: 'verificationStatus',
      operator: '==',
      threshold: 'Active'
    },
    {
      id: 'req-2',
      name: 'Scholar or above',
      type: 'SIMPLE',
      priority: 1,
      providerId: 'membership',
      condition: 'tier >= Scholar',
      metric: 'tier',
      operator: '>=',
      threshold: 'Scholar'
    }
  ]
};

describe('Certification - Sprint 5.1', () => {
  it('should evaluate a fully eligible applicant', async () => {
    const bus = new EventBus();
    const membershipProvider = new MembershipRuleProvider(mockMembershipLookup as any, mockTierLookup as any);
    const engine = new PrerequisiteEngine([membershipProvider]);
    const schemeRuntime = new SchemeRuntime(bus);
    const eligibilityPolicy = new EligibilityPolicy(engine, schemeRuntime);
    const applicantRuntime = new ApplicantRuntime(mockMembershipLookup as any);
    const applicationRuntime = new ApplicationRuntime(eligibilityPolicy, bus);

    // 1. Create and activate scheme
    const schemeId = await schemeRuntime.createScheme({
      name: 'Reviewer Certification',
      description: 'For Campus OS peer reviewers',
      version: '1.0',
      status: 'Draft',
      applicationPrerequisites: reviewerSchemePrerequisites,
      assessmentComponents: [{ method: 'Exam', weight: 100, required: true, passingThreshold: 70 }],
      renewalPolicy: { validityMonths: 24, cpd: [], prerequisites: reviewerSchemePrerequisites }
    });
    await schemeRuntime.activateScheme(schemeId);

    // 2. Create applicant from active membership
    const applicantId = await applicantRuntime.createApplicant('mem_active', {
      preferredName: 'Dr. Scholar', currentInstitution: 'MIT', currentRole: 'Researcher', areaOfExpertise: ['AI']
    });

    // 3. Create and submit application
    const appId = await applicationRuntime.createDraft(schemeId, applicantId, 'mem_active');
    await applicationRuntime.submit(appId);
    await applicationRuntime.beginReview(appId);

    // 4. Run eligibility determination
    const app = await applicationRuntime.getApplication(appId);
    const { outcome, conditions } = await eligibilityPolicy.determineEligibility(app!);
    expect(outcome).toBe('Eligible');
    expect(conditions.length).toBe(0);

    // 5. Record result
    await applicationRuntime.recordEligibility(appId, outcome, conditions);
    const final = await applicationRuntime.getApplication(appId);
    expect(final?.state).toBe('Eligible');
  });

  it('should correctly evaluate composite ANY rule', async () => {
    const bus = new EventBus();
    const membershipProvider = new MembershipRuleProvider(mockMembershipLookup as any, mockTierLookup as any);
    const engine = new PrerequisiteEngine([membershipProvider]);

    const anyRule: PrerequisiteRule = {
      id: 'any-root', name: 'Any condition',
      type: 'COMPOSITE', priority: 1, operator: 'ANY',
      rules: [
        { id: 'r1', name: 'Premium tier', type: 'SIMPLE', priority: 1, providerId: 'membership', condition: '', metric: 'tier', operator: '>=', threshold: 'Premium' },
        { id: 'r2', name: 'Active member', type: 'SIMPLE', priority: 1, providerId: 'membership', condition: '', metric: 'verificationStatus', operator: '==', threshold: 'Active' }
      ]
    };

    const report = await engine.evaluate(anyRule, { membershipId: 'mem_active', applicantId: 'a1', applicationId: 'app1', schemeId: 's1' });
    expect(report.overallPassed).toBe(true); // Scholar >= Premium AND Active → ANY passes
  });

  it('should block applicant with inactive membership', async () => {
    const bus = new EventBus();
    const applicantRuntime = new ApplicantRuntime(mockMembershipLookup as any);
    await expect(applicantRuntime.createApplicant('mem_inactive', { preferredName: 'X', currentInstitution: 'X', currentRole: 'X', areaOfExpertise: [] }))
      .rejects.toThrow(/not active/);
  });
});
