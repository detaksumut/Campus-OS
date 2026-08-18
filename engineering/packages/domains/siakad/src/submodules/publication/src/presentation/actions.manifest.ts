import { ActionDescriptor } from '../../../../../../../presentation-kernel/src/contracts/ActionDescriptor';

export const PublicationActions: ActionDescriptor[] = [
  {
    id: 'publication.submit_manuscript',
    category: 'Publication',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'authenticated', // Any authenticated user can submit
    payloadSchema: {
      type: 'object',
      properties: {
        authorId: { type: 'string' },
        title: { type: 'string' },
        abstractText: { type: 'string' },
        fileUrl: { type: 'string' },
        checksum: { type: 'string' }
      },
      required: ['authorId', 'title', 'abstractText', 'fileUrl', 'checksum']
    }
  },
  {
    id: 'publication.assign_reviewer',
    category: 'Editorial',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'editor', // Editor only
    payloadSchema: {
      type: 'object',
      properties: {
        submissionId: { type: 'string' },
        reviewerId: { type: 'string' },
        deadline: { type: 'string', format: 'date-time' }
      },
      required: ['submissionId', 'reviewerId', 'deadline']
    }
  },
  {
    id: 'publication.submit_review',
    category: 'Editorial',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'reviewer', // Must be an assigned reviewer
    payloadSchema: {
      type: 'object',
      properties: {
        submissionId: { type: 'string' },
        reviewerId: { type: 'string' },
        decision: { type: 'string' },
        commentsToAuthor: { type: 'string' },
        commentsToEditor: { type: 'string' }
      },
      required: ['submissionId', 'reviewerId', 'decision', 'commentsToAuthor', 'commentsToEditor']
    }
  },
  {
    id: 'publication.make_decision',
    category: 'Editorial',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'editor',
    payloadSchema: {
      type: 'object',
      properties: {
        submissionId: { type: 'string' },
        editorId: { type: 'string' },
        decision: { type: 'string' },
        justification: { type: 'string' }
      },
      required: ['submissionId', 'editorId', 'decision', 'justification']
    }
  },
  {
    id: 'publication.publish_article',
    category: 'Editorial',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'editor',
    payloadSchema: {
      type: 'object',
      properties: {
        submissionId: { type: 'string' },
        editorId: { type: 'string' }
      },
      required: ['submissionId', 'editorId']
    }
  }
];
