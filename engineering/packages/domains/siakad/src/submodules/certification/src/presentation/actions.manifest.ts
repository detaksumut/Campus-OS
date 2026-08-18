import { ActionDescriptor } from '../../../../../../../presentation-kernel/src/contracts/ActionDescriptor';

export const CertificationActions: ActionDescriptor[] = [
  {
    id: 'certification.apply',
    category: 'Certification',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'authenticated',
    payloadSchema: {
      type: 'object',
      properties: {
        candidateId: { type: 'string' },
        programId: { type: 'string' }
      },
      required: ['candidateId', 'programId']
    }
  },
  {
    id: 'certification.schedule_exam',
    category: 'CertificationAdmin',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin',
    payloadSchema: {
      type: 'object',
      properties: {
        applicationId: { type: 'string' },
        scheduledStart: { type: 'string', format: 'date-time' },
        timeLimitMinutes: { type: 'number' }
      },
      required: ['applicationId', 'scheduledStart', 'timeLimitMinutes']
    }
  },
  {
    id: 'certification.submit_exam',
    category: 'Certification',
    idempotent: false,
    retryPolicy: { maxAttempts: 3, backoffMs: 1000 },
    version: '1.0.0',
    permission: 'candidate',
    payloadSchema: {
      type: 'object',
      properties: {
        applicationId: { type: 'string' },
        examId: { type: 'string' },
        score: { type: 'number' }
      },
      required: ['applicationId', 'examId', 'score']
    }
  },
  {
    id: 'certification.schedule_interview',
    category: 'CertificationAdmin',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin',
    payloadSchema: {
      type: 'object',
      properties: {
        applicationId: { type: 'string' },
        scheduledTime: { type: 'string', format: 'date-time' },
        assessorIds: { type: 'array', items: { type: 'string' } }
      },
      required: ['applicationId', 'scheduledTime', 'assessorIds']
    }
  },
  {
    id: 'certification.record_interview',
    category: 'CertificationAssessor',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'assessor',
    payloadSchema: {
      type: 'object',
      properties: {
        applicationId: { type: 'string' },
        interviewId: { type: 'string' },
        assessorId: { type: 'string' },
        score: { type: 'number' },
        resultNotes: { type: 'string' }
      },
      required: ['applicationId', 'interviewId', 'assessorId', 'score', 'resultNotes']
    }
  },
  {
    id: 'certification.issue_certificate',
    category: 'CertificationAdmin',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin',
    payloadSchema: {
      type: 'object',
      properties: {
        applicationId: { type: 'string' }
      },
      required: ['applicationId']
    }
  },
  {
    id: 'certification.verify_certificate',
    category: 'Public',
    idempotent: true,
    retryPolicy: { maxAttempts: 3, backoffMs: 500 },
    version: '1.0.0',
    permission: 'public',
    payloadSchema: {
      type: 'object',
      properties: {
        certificateId: { type: 'string' },
        hashToVerify: { type: 'string' }
      },
      required: ['certificateId', 'hashToVerify']
    }
  }
];
