import { defineForm } from '@campus-os/presentation-core';

export const ApplicationForm = defineForm({
  id: 'application-form',
  fields: [
    { name: 'schemeId', type: 'text', label: 'Certification Scheme', required: true },
    { name: 'applicantName', type: 'text', label: 'Applicant Name', required: true },
    { name: 'portfolio', type: 'file', label: 'Portfolio (PDF)' },
    { name: 'submit', type: 'submit', label: 'Apply for Certification' }
  ],
  submissionPipeline: 'CertificationCommandApplicationService/applyForScheme'
});

export const AssessmentForm = defineForm({
  id: 'assessment-form',
  fields: [
    { name: 'applicationId', type: 'text', label: 'Application ID', required: true },
    { name: 'score', type: 'number', label: 'Assessment Score (0-100)' },
    { name: 'verdict', type: 'select', label: 'Verdict', options: ['PASS', 'FAIL'] },
    { name: 'submit', type: 'submit', label: 'Submit Assessment' }
  ],
  submissionPipeline: 'CertificationCommandApplicationService/submitAssessment'
});
