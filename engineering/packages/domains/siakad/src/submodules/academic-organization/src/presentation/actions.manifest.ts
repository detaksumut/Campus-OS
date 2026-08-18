import { ActionDescriptor } from '../../../../../../../presentation-kernel/src/contracts/ActionDescriptor';

export const OrganizationActions: ActionDescriptor[] = [
  {
    id: 'organization.create_faculty',
    category: 'Academic Organization',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin.academic',
    payloadSchema: {
      type: 'object',
      properties: {
        universityId: { type: 'string' },
        name: { type: 'string' }
      },
      required: ['universityId', 'name']
    }
  },
  {
    id: 'organization.create_department',
    category: 'Academic Organization',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin.academic',
    payloadSchema: {
      type: 'object',
      properties: {
        universityId: { type: 'string' },
        facultyId: { type: 'string' },
        name: { type: 'string' }
      },
      required: ['universityId', 'facultyId', 'name']
    }
  },
  {
    id: 'organization.create_study_program',
    category: 'Academic Organization',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin.academic',
    payloadSchema: {
      type: 'object',
      properties: {
        universityId: { type: 'string' },
        departmentId: { type: 'string' },
        name: { type: 'string' },
        level: { type: 'string' },
        accreditation: { type: 'string' }
      },
      required: ['universityId', 'departmentId', 'name', 'level', 'accreditation']
    }
  }
];
