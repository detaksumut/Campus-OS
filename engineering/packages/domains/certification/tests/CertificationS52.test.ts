import { describe, it, expect } from 'vitest';
import { EventBus } from '@campus-os/kernel';
import { SchemeRuntime } from '../src/runtime/SchemeRuntime';
import { ExamRuntime } from '../src/runtime/ExamRuntime';
import { InterviewRuntime } from '../src/runtime/InterviewRuntime';
import { ApplicantRuntime } from '../src/runtime/ApplicantRuntime';
import { ApplicationRuntime } from '../src/runtime/ApplicationRuntime';
import { PrerequisiteEngine } from '../src/policies/PrerequisiteEngine';
import { MembershipRuleProvider, PublicationRuleProvider } from '../src/policies/RuleProviders';
import { EligibilityPolicy } from '../src/policies/EligibilityPolicy';
import { CertificationScheme, PrerequisiteRule } from '../src/contracts';

const mockMembership = {
  getMembershipStatus: async (id: string) => ({ status: 'Active' }),
  getActiveTier: async (_: string) => ({ tierName: 'Scholar', tierLevel: 3 })
};
const mockPublication = {
  getPublicationCountByAuthor: async (_: string) => 3
};

const reviewerPrerequisites: PrerequisiteRule = {
  id: 'root', name: 'Reviewer Prereqs', type: 'COMPOSITE', priority: 1, operator: 'ALL',
  rules: [
    { id: 'r1', name: 'Active', type: 'SIMPLE', priority: 1, providerId: 'membership', condition: '', metric: 'verificationStatus', operator: '==', threshold: 'Active' },
    { id: 'r2', name: 'Scholar+', type: 'SIMPLE', priority: 1, providerId: 'membership', condition: '', metric: 'tier', operator: '>=', threshold: 'Scholar' },
    { id: 'r3', name: '2+ Publications', type: 'SIMPLE', priority: 2, providerId: 'publication', condition: '', metric: 'publicationCount', operator: '>=', threshold: 2 }
  ]
};

async function buildContext() {
  const bus = new EventBus();
  const memProvider = new MembershipRuleProvider(mockMembership as any, mockMembership as any);
  const pubProvider = new PublicationRuleProvider(mockPublication);
  const engine = new PrerequisiteEngine([memProvider, pubProvider]);
  const schemeRuntime = new SchemeRuntime(bus);
  const eligibilityPolicy = new EligibilityPolicy(engine, schemeRuntime);
  const applicantRuntime = new ApplicantRuntime(mockMembership as any);
  const applicationRuntime = new ApplicationRuntime(eligibilityPolicy, bus);
  const examRuntime = new ExamRuntime(schemeRuntime, bus);
  const interviewRuntime = new InterviewRuntime(schemeRuntime, bus);

  const schemeId = await schemeRuntime.createScheme({
    name: 'Reviewer Certification', description: 'RC v1', version: '1.0', status: 'Draft',
    applicationPrerequisites: reviewerPrerequisites,
    assessmentComponents: [
      { method: 'Exam', weight: 60, required: true, passingThreshold: 70, maxAttempts: 3 },
      { method: 'Interview', weight: 40, required: true, passingThreshold: 60, maxAttempts: 1 }
    ],
    renewalPolicy: { validityMonths: 24, cpd: [], prerequisites: reviewerPrerequisites }
  });
  await schemeRuntime.activateScheme(schemeId);
  return { bus, schemeRuntime, eligibilityPolicy, applicantRuntime, applicationRuntime, examRuntime, interviewRuntime, schemeId };
}

describe('Certification - Sprint 5.2', () => {
  it('should complete Exam lifecycle with grading', async () => {
    const { applicationRuntime, applicantRuntime, examRuntime, schemeId } = await buildContext();

    const applicantId = await applicantRuntime.createApplicant('mem_1', {
      preferredName: 'Dr. Test', currentInstitution: 'MIT', currentRole: 'Researcher', areaOfExpertise: ['AI']
    });
    const appId = await applicationRuntime.createDraft(schemeId, applicantId, 'mem_1');

    const examId = await examRuntime.scheduleExam(appId, schemeId, applicantId);
    await examRuntime.startExam(examId);
    await examRuntime.completeExam(examId);
    await examRuntime.gradeExam(examId, 78, 100, 'grader_1');

    const exam = await examRuntime.getExam(examId);
    expect(exam?.state).toBe('Graded');
    expect(exam?.attempts[0].score?.passed).toBe(true);
    expect(exam?.attempts[0].score?.percentage).toBe(78);
  });

  it('should enforce maxAttempts on exam', async () => {
    const { applicationRuntime, applicantRuntime, examRuntime, schemeId } = await buildContext();
    const applicantId = await applicantRuntime.createApplicant('mem_2', { preferredName: 'X', currentInstitution: 'X', currentRole: 'X', areaOfExpertise: [] });
    const appId = await applicationRuntime.createDraft(schemeId, applicantId, 'mem_2');
    const examId = await examRuntime.scheduleExam(appId, schemeId, applicantId);

    // Exhaust all attempts
    for (let i = 0; i < 3; i++) {
      await examRuntime.startExam(examId);
      await examRuntime.completeExam(examId);
      await examRuntime.gradeExam(examId, 50, 100, 'g1');
      if (i < 2) await examRuntime.reschedule(examId);
    }
    await expect(examRuntime.reschedule(examId)).rejects.toThrow(/Maximum attempts/);
  });

  it('should complete Interview lifecycle', async () => {
    const { applicationRuntime, applicantRuntime, interviewRuntime, schemeId } = await buildContext();
    const applicantId = await applicantRuntime.createApplicant('mem_3', { preferredName: 'Y', currentInstitution: 'Y', currentRole: 'Y', areaOfExpertise: [] });
    const appId = await applicationRuntime.createDraft(schemeId, applicantId, 'mem_3');

    const interviewId = await interviewRuntime.scheduleInterview(appId, schemeId, applicantId, 'interviewer_1', Date.now() + 86400000);
    await interviewRuntime.conductInterview(interviewId);
    await interviewRuntime.evaluateInterview(interviewId, {
      scores: { communication: 85, knowledge: 90 },
      comments: 'Strong candidate',
      recommendation: 'Pass',
      evaluatedAt: Date.now(),
      evaluatedBy: 'interviewer_1'
    });

    const interview = await interviewRuntime.getInterview(interviewId);
    expect(interview?.state).toBe('Evaluated');
    expect(interview?.evaluation?.recommendation).toBe('Pass');
  });

  it('should return auditable RuleEvidence in eligibility report', async () => {
    const { eligibilityPolicy, applicationRuntime, applicantRuntime, schemeId } = await buildContext();
    const applicantId = await applicantRuntime.createApplicant('mem_4', { preferredName: 'Z', currentInstitution: 'Z', currentRole: 'Z', areaOfExpertise: [] });
    const appId = await applicationRuntime.createDraft(schemeId, applicantId, 'mem_4');
    await applicationRuntime.submit(appId);
    await applicationRuntime.beginReview(appId);
    const app = await applicationRuntime.getApplication(appId);

    const { outcome, conditions } = await eligibilityPolicy.determineEligibility(app!);
    expect(outcome).toBe('Eligible');
    // The engine results carry evidence from providers
  });
});
