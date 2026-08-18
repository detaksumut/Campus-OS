import { ActionDescriptor } from '../../../../../../../presentation-kernel/src/contracts/ActionDescriptor';

export const StudyPlanActions: ActionDescriptor[] = [
  {
    id: 'study_plan.draft',
    category: 'Study Plan',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'student.self',
    payloadSchema: {
      type: 'object',
      properties: { studentId: { type: 'string' }, academicPeriodId: { type: 'string' } },
      required: ['studentId', 'academicPeriodId']
    }
  },
  {
    id: 'study_plan.add_item',
    category: 'Study Plan',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'student.self',
    payloadSchema: {
      type: 'object',
      properties: { studyPlanId: { type: 'string' }, classSectionId: { type: 'string' }, isMandatory: { type: 'boolean' } },
      required: ['studyPlanId', 'classSectionId', 'isMandatory']
    }
  },
  {
    id: 'study_plan.finalize',
    category: 'Study Plan',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin.advisor',
    payloadSchema: {
      type: 'object',
      properties: { studyPlanId: { type: 'string' } },
      required: ['studyPlanId']
    }
  }
];
