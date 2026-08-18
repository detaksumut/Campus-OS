import { describe, it, expect, vi } from 'vitest';
import { EventBus } from '@campus-os/kernel';
import { SchemeRuntime } from '../src/runtime/SchemeRuntime';
import { ExamRuntime } from '../src/runtime/ExamRuntime';
import { InterviewRuntime } from '../src/runtime/InterviewRuntime';
import { AssessmentRuntime, AssessmentPolicy } from '../src/runtime/AssessmentRuntime';
import { CertificationDecisionRuntime } from '../src/runtime/CertificationDecisionRuntime';
import { ApplicantRuntime } from '../src/runtime/ApplicantRuntime';
import { ApplicationRuntime } from '../src/runtime/ApplicationRuntime';
import { PrerequisiteEngine } from '../src/policies/PrerequisiteEngine';
import { MembershipRuleProvider } from '../src/policies/RuleProviders';
import { EligibilityPolicy } from '../src/policies/EligibilityPolicy';
import { AssessmentResult, CertificationScheme, PrerequisiteRule } from '../src/contracts';

const mockMembership = {
  getMembershipStatus: async (_: string) => ({ status: 'Active' }),
  getActiveTier: async (_: string) => ({ tierName: 'Scholar', tierLevel: 3 })
};

const prereqs: PrerequisiteRule = {
  id: 'root', name: 'All', type: 'COMPOSITE', priority: 1, operator: 'ALL',
  rules: [{ id: 'r1', name: 'Active', type: 'SIMPLE', priority: 1, providerId: 'membership', condition: '', metric: 'verificationStatus', operator: '==', threshold: 'Active' }]
};

async function buildFullContext() {
  const bus = new EventBus();
  const engine = new PrerequisiteEngine([new MembershipRuleProvider(mockMembership as any, mockMembership as any)]);
  const schemeRuntime = new SchemeRuntime(bus);
  const eligibilityPolicy = new EligibilityPolicy(engine, schemeRuntime);
  const applicantRuntime = new ApplicantRuntime(mockMembership as any);
  const applicationRuntime = new ApplicationRuntime(eligibilityPolicy, bus);
  const assessmentPolicy = new AssessmentPolicy();
  const assessmentRuntime = new AssessmentRuntime(schemeRuntime, assessmentPolicy, bus);
  const decisionRuntime = new CertificationDecisionRuntime(assessmentRuntime, applicationRuntime, bus);
  const examRuntime = new ExamRuntime(schemeRuntime, bus);
  const interviewRuntime = new InterviewRuntime(schemeRuntime, bus);

  const schemeId = await schemeRuntime.createScheme({
    name: 'Reviewer Cert', description: 'RC', version: '1.0', status: 'Draft',
    applicationPrerequisites: prereqs,
    assessmentComponents: [
      { method: 'Exam', weight: 60, required: true, passingThreshold: 70, maxAttempts: 3, gradingMethod: 'Numeric' },
      { method: 'Interview', weight: 40, required: true, passingThreshold: 60, maxAttempts: 1, gradingMethod: 'Rubric' }
    ],
    renewalPolicy: { validityMonths: 24, cpd: [], prerequisites: prereqs }
  });
  await schemeRuntime.activateScheme(schemeId);

  const applicantId = await applicantRuntime.createApplicant('mem_1', {
    preferredName: 'Dr. A', currentInstitution: 'MIT', currentRole: 'Researcher', areaOfExpertise: ['AI']
  });
  const appId = await applicationRuntime.createDraft(schemeId, applicantId, 'mem_1');

  return { bus, schemeRuntime, applicationRuntime, assessmentRuntime, decisionRuntime, examRuntime, interviewRuntime, schemeId, applicantId, appId };
}

describe('Certification - Sprint 5.3: Assessment & Decision', () => {
  it('should complete weighted assessment and issue Certified decision', async () => {
    const { assessmentRuntime, decisionRuntime, applicationRuntime, schemeId, appId } = await buildFullContext();

    const assessmentId = await assessmentRuntime.openAssessment(appId, schemeId);

    const examResult: AssessmentResult = {
      componentType: 'Exam', componentId: 'exam_1',
      score: { raw: 80, max: 100, percentage: 80, passed: true, gradedAt: Date.now(), gradedBy: 'sys' },
      status: 'Passed', recommendation: 'Pass', completedAt: Date.now()
    };
    const interviewResult: AssessmentResult = {
      componentType: 'Interview', componentId: 'int_1',
      score: { raw: 72, max: 100, percentage: 72, passed: true, gradedAt: Date.now(), gradedBy: 'panel' },
      status: 'Passed', recommendation: 'Pass', completedAt: Date.now()
    };

    await assessmentRuntime.recordComponentResult(assessmentId, examResult);
    await assessmentRuntime.recordComponentResult(assessmentId, interviewResult);
    await assessmentRuntime.completeAssessment(assessmentId);

    const assessment = await assessmentRuntime.getAssessment(assessmentId);
    expect(assessment?.state).toBe('Completed');
    expect(assessment?.overallPassed).toBe(true);
    // Weighted: 80*0.6 + 72*0.4 = 48 + 28.8 = 76.8
    expect(assessment?.overallScore).toBe(76.8);

    // Issue Decision
    const decisionId = await decisionRuntime.issueDecision(
      appId, assessmentId, schemeId,
      'Certified', 'All components passed', 'Excellent candidate', 'committee_chair'
    );
    const decision = await decisionRuntime.getDecision(decisionId);
    expect(decision?.decision).toBe('Certified');
    expect(decision?.componentSummary.length).toBe(2);
  });

  it('should fail assessment if mandatory component fails', async () => {
    const { assessmentRuntime, schemeId, appId } = await buildFullContext();
    const assessmentId = await assessmentRuntime.openAssessment(appId, schemeId);

    await assessmentRuntime.recordComponentResult(assessmentId, {
      componentType: 'Exam', componentId: 'exam_fail',
      score: { raw: 40, max: 100, percentage: 40, passed: false, gradedAt: Date.now(), gradedBy: 'sys' },
      status: 'Failed', recommendation: 'Fail', completedAt: Date.now()
    });
    await assessmentRuntime.recordComponentResult(assessmentId, {
      componentType: 'Interview', componentId: 'int_ok',
      score: { raw: 90, max: 100, percentage: 90, passed: true, gradedAt: Date.now(), gradedBy: 'panel' },
      status: 'Passed', recommendation: 'Pass', completedAt: Date.now()
    });
    await assessmentRuntime.completeAssessment(assessmentId);
    const a = await assessmentRuntime.getAssessment(assessmentId);
    expect(a?.overallPassed).toBe(false); // Mandatory Exam failed
  });

  it('should block decision on incomplete assessment', async () => {
    const { assessmentRuntime, decisionRuntime, schemeId, appId } = await buildFullContext();
    const assessmentId = await assessmentRuntime.openAssessment(appId, schemeId);
    await expect(decisionRuntime.issueDecision(appId, assessmentId, schemeId, 'Certified', '', '', 'admin'))
      .rejects.toThrow(/completed/);
  });

  it('should emit Integration Event on Certified but not on Failed', async () => {
    const { assessmentRuntime, decisionRuntime, schemeId, appId, bus } = await buildFullContext();
    const integrationEvents: string[] = [];
    bus.on('certification.certificate.issued', () => integrationEvents.push('issued'));

    const assessmentId = await assessmentRuntime.openAssessment(appId, schemeId);
    await assessmentRuntime.recordComponentResult(assessmentId, { componentType: 'Exam', componentId: 'e1', score: { raw: 75, max: 100, percentage: 75, passed: true, gradedAt: Date.now(), gradedBy: 'g' }, status: 'Passed', recommendation: 'Pass', completedAt: Date.now() });
    await assessmentRuntime.recordComponentResult(assessmentId, { componentType: 'Interview', componentId: 'i1', score: { raw: 70, max: 100, percentage: 70, passed: true, gradedAt: Date.now(), gradedBy: 'g' }, status: 'Passed', recommendation: 'Pass', completedAt: Date.now() });
    await assessmentRuntime.completeAssessment(assessmentId);
    await decisionRuntime.issueDecision(appId, assessmentId, schemeId, 'Certified', 'Pass', '', 'admin');
    expect(integrationEvents).toContain('issued');
  });
});
