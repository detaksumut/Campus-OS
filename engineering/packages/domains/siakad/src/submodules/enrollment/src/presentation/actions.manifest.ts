import { ActionDescriptor } from '../../../../../../../presentation-kernel/src/contracts/ActionDescriptor';

export const EnrollmentActions: ActionDescriptor[] = [
  {
    id: 'enrollment.confirm',
    category: 'Enrollment',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'system.enrollment',
    payloadSchema: {
      type: 'object',
      properties: { studentId: { type: 'string' }, classSectionId: { type: 'string' }, studyPlanId: { type: 'string' } },
      required: ['studentId', 'classSectionId', 'studyPlanId']
    }
  },
  {
    id: 'enrollment.drop',
    category: 'Enrollment',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin.enrollment',
    payloadSchema: {
      type: 'object',
      properties: { enrollmentId: { type: 'string' } },
      required: ['enrollmentId']
    }
  }
];
