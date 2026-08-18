import { ActionDescriptor } from '../../../../../../../presentation-kernel/src/contracts/ActionDescriptor';

export const CommunityActions: ActionDescriptor[] = [
  {
    id: 'community.create',
    category: 'Community',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'authenticated',
    payloadSchema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        type: { type: 'string' },
        visibility: { type: 'string' },
        joinPolicy: { type: 'string' },
        ownerId: { type: 'string' },
        parentCommunityId: { type: 'string' }
      },
      required: ['name', 'type', 'visibility', 'joinPolicy', 'ownerId']
    }
  },
  {
    id: 'community.request_join',
    category: 'Community',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'authenticated',
    payloadSchema: {
      type: 'object',
      properties: {
        communityId: { type: 'string' },
        memberId: { type: 'string' },
        requestMessage: { type: 'string' }
      },
      required: ['communityId', 'memberId']
    }
  },
  {
    id: 'community.approve_member',
    category: 'Community',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin',
    payloadSchema: {
      type: 'object',
      properties: {
        communityId: { type: 'string' },
        requestId: { type: 'string' },
        adminId: { type: 'string' }
      },
      required: ['communityId', 'requestId', 'adminId']
    }
  },
  {
    id: 'community.post_discussion',
    category: 'Community',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'member',
    payloadSchema: {
      type: 'object',
      properties: {
        communityId: { type: 'string' },
        authorId: { type: 'string' },
        title: { type: 'string' },
        content: { type: 'string' },
        references: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              referenceId: { type: 'string' },
              context: { type: 'string' }
            },
            required: ['referenceId', 'context']
          }
        }
      },
      required: ['communityId', 'authorId', 'title', 'content']
    }
  },
  {
    id: 'community.publish_announcement',
    category: 'Community',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin',
    payloadSchema: {
      type: 'object',
      properties: {
        communityId: { type: 'string' },
        authorId: { type: 'string' },
        title: { type: 'string' },
        content: { type: 'string' }
      },
      required: ['communityId', 'authorId', 'title', 'content']
    }
  },
  {
    id: 'community.organize_event',
    category: 'Community',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'member',
    payloadSchema: {
      type: 'object',
      properties: {
        communityId: { type: 'string' },
        organizerId: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        scheduleDate: { type: 'string', format: 'date-time' }
      },
      required: ['communityId', 'organizerId', 'title', 'scheduleDate']
    }
  }
];
