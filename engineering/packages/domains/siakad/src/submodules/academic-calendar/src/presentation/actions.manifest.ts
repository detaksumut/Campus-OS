import { ActionDescriptor } from '../../../../../../../presentation-kernel/src/contracts/ActionDescriptor';

export const CalendarActions: ActionDescriptor[] = [
  {
    id: 'calendar.create',
    category: 'Academic Calendar',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin.academic',
    payloadSchema: {
      type: 'object',
      properties: {
        academicYear: { type: 'string' },
        semester: { type: 'string' },
        startDate: { type: 'string', format: 'date-time' },
        endDate: { type: 'string', format: 'date-time' }
      },
      required: ['academicYear', 'semester', 'startDate', 'endDate']
    }
  },
  {
    id: 'calendar.define_period',
    category: 'Academic Calendar',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin.academic',
    payloadSchema: {
      type: 'object',
      properties: {
        academicYear: { type: 'string' },
        semester: { type: 'string' },
        periodType: { type: 'string' },
        name: { type: 'string' },
        startDate: { type: 'string', format: 'date-time' },
        endDate: { type: 'string', format: 'date-time' }
      },
      required: ['academicYear', 'semester', 'periodType', 'name', 'startDate', 'endDate']
    }
  },
  {
    id: 'calendar.publish',
    category: 'Academic Calendar',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin.academic',
    payloadSchema: {
      type: 'object',
      properties: {
        academicYear: { type: 'string' },
        semester: { type: 'string' }
      },
      required: ['academicYear', 'semester']
    }
  }
];
