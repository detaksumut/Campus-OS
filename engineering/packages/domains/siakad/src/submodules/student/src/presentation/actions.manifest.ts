import { ActionDescriptor } from '../../../../../../../presentation-kernel/src/contracts/ActionDescriptor';

export const StudentActions: ActionDescriptor[] = [
  {
    id: 'student.register',
    category: 'Student Record',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin.student',
    payloadSchema: {
      type: 'object',
      properties: {
        nim: { type: 'string' },
        registrationId: { type: 'string' },
        memberId: { type: 'string' },
        studyProgramId: { type: 'string' },
        enrollmentYear: { type: 'number' }
      },
      required: ['nim', 'registrationId', 'memberId', 'studyProgramId', 'enrollmentYear']
    }
  },
  {
    id: 'student.request_leave',
    category: 'Student Record',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'student.self',
    payloadSchema: {
      type: 'object',
      properties: {
        studentId: { type: 'string' },
        semesterId: { type: 'string' },
        reason: { type: 'string' }
      },
      required: ['studentId', 'semesterId', 'reason']
    }
  },
  {
    id: 'student.graduate',
    category: 'Student Record',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin.student',
    payloadSchema: {
      type: 'object',
      properties: {
        studentId: { type: 'string' }
      },
      required: ['studentId']
    }
  }
];
