import { ActionDescriptor } from '../../../../../../../presentation-kernel/src/contracts/ActionDescriptor';

export const CurriculumActions: ActionDescriptor[] = [
  {
    id: 'curriculum.create_course',
    category: 'Curriculum',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin.curriculum',
    payloadSchema: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        name: { type: 'string' },
        credits: { type: 'number' },
        type: { type: 'string' }
      },
      required: ['code', 'name', 'credits', 'type']
    }
  },
  {
    id: 'curriculum.define',
    category: 'Curriculum',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin.curriculum',
    payloadSchema: {
      type: 'object',
      properties: {
        studyProgramId: { type: 'string' },
        name: { type: 'string' },
        startYear: { type: 'string' }
      },
      required: ['studyProgramId', 'name', 'startYear']
    }
  },
  {
    id: 'curriculum.add_course',
    category: 'Curriculum',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin.curriculum',
    payloadSchema: {
      type: 'object',
      properties: {
        curriculumId: { type: 'string' },
        courseId: { type: 'string' },
        recommendedSemester: { type: 'number' },
        isMandatory: { type: 'boolean' }
      },
      required: ['curriculumId', 'courseId', 'recommendedSemester', 'isMandatory']
    }
  }
];
