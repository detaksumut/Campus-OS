import { ActionDescriptor } from '../../../../../../../presentation-kernel/src/contracts/ActionDescriptor';

export const MembershipActions: ActionDescriptor[] = [
  {
    id: 'membership.create',
    category: 'Membership',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'authenticated', // Requires JWT
    payloadSchema: {
      type: 'object',
      properties: {
        memberId: { type: 'string' },
        academicLevel: { type: 'string' },
        affiliation: { type: 'string' },
        department: { type: 'string' },
        enrollmentYear: { type: 'integer' }
      },
      required: ['memberId', 'academicLevel', 'affiliation', 'department', 'enrollmentYear']
    }
  },
  {
    id: 'membership.approve',
    category: 'Admin',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin', // Requires Admin role
    payloadSchema: {
      type: 'object',
      properties: {
        memberId: { type: 'string' },
        approvedByAdminId: { type: 'string' }
      },
      required: ['memberId', 'approvedByAdminId']
    }
  }
];
