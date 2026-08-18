import { ActionDescriptor } from '../../../../../../../presentation-kernel/src/contracts/ActionDescriptor';

export const CourseOfferingActions: ActionDescriptor[] = [
  {
    id: 'course_offering.draft',
    category: 'Course Offering',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin.course_offering',
    payloadSchema: {
      type: 'object',
      properties: { courseId: { type: 'string' }, academicPeriodId: { type: 'string' } },
      required: ['courseId', 'academicPeriodId']
    }
  },
  {
    id: 'course_offering.add_section',
    category: 'Course Offering',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin.course_offering',
    payloadSchema: {
      type: 'object',
      properties: { courseOfferingId: { type: 'string' }, name: { type: 'string' }, capacity: { type: 'number' } },
      required: ['courseOfferingId', 'name', 'capacity']
    }
  },
  {
    id: 'course_offering.publish',
    category: 'Course Offering',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin.course_offering',
    payloadSchema: {
      type: 'object',
      properties: { courseOfferingId: { type: 'string' } },
      required: ['courseOfferingId']
    }
  }
];
