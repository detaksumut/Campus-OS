import { ActionDescriptor } from '../../../../../../../presentation-kernel/src/contracts/ActionDescriptor';

export const ConferenceActions: ActionDescriptor[] = [
  {
    id: 'conference.create',
    category: 'Conference',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'authenticated', // Admin validation later
    payloadSchema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        type: { type: 'string', enum: ['ONSITE', 'ONLINE', 'HYBRID'] },
        reviewMode: { type: 'string', enum: ['DOUBLE_BLIND', 'SINGLE_BLIND', 'OPEN_REVIEW'] }
      },
      required: ['name', 'type', 'reviewMode']
    }
  },
  {
    id: 'conference.submit_paper',
    category: 'Conference',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'authenticated',
    payloadSchema: {
      type: 'object',
      properties: {
        conferenceId: { type: 'string' },
        trackId: { type: 'string' },
        title: { type: 'string' },
        abstractText: { type: 'string' },
        researchProjectId: { type: 'string' }
      },
      required: ['conferenceId', 'trackId', 'title', 'abstractText']
    }
  },
  {
    id: 'conference.assign_reviewer',
    category: 'Conference',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'chair', // E.g., specific committee roles
    payloadSchema: {
      type: 'object',
      properties: {
        conferenceId: { type: 'string' },
        memberId: { type: 'string' },
        role: { type: 'string', enum: ['CHAIR', 'TRACK_DIRECTOR', 'REVIEWER'] }
      },
      required: ['conferenceId', 'memberId', 'role']
    }
  },
  {
    id: 'conference.record_review',
    category: 'Conference',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'reviewer',
    payloadSchema: {
      type: 'object',
      properties: {
        conferenceId: { type: 'string' },
        paperId: { type: 'string' },
        decision: { type: 'string', enum: ['ACCEPT', 'REJECT'] },
        notes: { type: 'string' }
      },
      required: ['conferenceId', 'paperId', 'decision']
    }
  },
  {
    id: 'conference.schedule_session',
    category: 'Conference',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'chair',
    payloadSchema: {
      type: 'object',
      properties: {
        conferenceId: { type: 'string' },
        sessionTitle: { type: 'string' },
        startTime: { type: 'string', format: 'date-time' },
        endTime: { type: 'string', format: 'date-time' },
        location: { type: 'string' },
        assignedPaperIds: { type: 'array', items: { type: 'string' } }
      },
      required: ['conferenceId', 'sessionTitle', 'startTime', 'endTime', 'location']
    }
  },
  {
    id: 'conference.complete',
    category: 'Conference',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'chair',
    payloadSchema: {
      type: 'object',
      properties: {
        conferenceId: { type: 'string' }
      },
      required: ['conferenceId']
    }
  }
];
