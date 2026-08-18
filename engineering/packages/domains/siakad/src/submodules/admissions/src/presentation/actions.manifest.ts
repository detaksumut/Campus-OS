import { ActionDescriptor } from '../../../../../../../presentation-kernel/src/contracts/ActionDescriptor';

export const AdmissionsActions: ActionDescriptor[] = [
  {
    id: 'admissions.create_period',
    category: 'Admissions',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin',
    payloadSchema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        route: { type: 'string' },
        academicYear: { type: 'string' },
        startDate: { type: 'string', format: 'date-time' },
        endDate: { type: 'string', format: 'date-time' }
      },
      required: ['name', 'route', 'academicYear', 'startDate', 'endDate']
    }
  },
  {
    id: 'admissions.register',
    category: 'Admissions',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'public', // Anyone can register as an applicant
    payloadSchema: {
      type: 'object',
      properties: {
        periodId: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' }
      },
      required: ['periodId', 'name', 'email', 'phone']
    }
  },
  {
    id: 'admissions.submit',
    category: 'Admissions',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'applicant', // Special ephemeral permission for applicants
    payloadSchema: {
      type: 'object',
      properties: {
        periodId: { type: 'string' },
        applicantId: { type: 'string' },
        programChoices: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              programCode: { type: 'string' },
              priority: { type: 'number' }
            },
            required: ['programCode', 'priority']
          }
        }
      },
      required: ['periodId', 'applicantId', 'programChoices']
    }
  },
  {
    id: 'admissions.evaluate',
    category: 'Admissions',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'evaluator',
    payloadSchema: {
      type: 'object',
      properties: {
        periodId: { type: 'string' },
        applicationId: { type: 'string' },
        stageId: { type: 'string' },
        evaluatorId: { type: 'string' },
        score: { type: 'number' },
        remarks: { type: 'string' }
      },
      required: ['periodId', 'applicationId', 'stageId', 'evaluatorId', 'score']
    }
  },
  {
    id: 'admissions.issue_offer',
    category: 'Admissions',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin',
    payloadSchema: {
      type: 'object',
      properties: {
        periodId: { type: 'string' },
        applicationId: { type: 'string' },
        programCode: { type: 'string' },
        validUntil: { type: 'string', format: 'date-time' }
      },
      required: ['periodId', 'applicationId', 'programCode', 'validUntil']
    }
  },
  {
    id: 'admissions.confirm_enrollment',
    category: 'Admissions',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'applicant',
    payloadSchema: {
      type: 'object',
      properties: {
        periodId: { type: 'string' },
        applicationId: { type: 'string' },
        offerId: { type: 'string' }
      },
      required: ['periodId', 'applicationId', 'offerId']
    }
  }
];
