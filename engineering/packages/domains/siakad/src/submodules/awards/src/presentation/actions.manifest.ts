import { ActionDescriptor } from '../../../../../../../presentation-kernel/src/contracts/ActionDescriptor';

export const AwardsActions: ActionDescriptor[] = [
  {
    id: 'awards.create_program',
    category: 'Awards',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'authenticated',
    payloadSchema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        category: { type: 'string' },
        cycle: { type: 'string', enum: ['ANNUAL', 'BIENNIAL', 'SPECIAL'] },
        allowSelfNomination: { type: 'boolean' }
      },
      required: ['name', 'category', 'cycle', 'allowSelfNomination']
    }
  },
  {
    id: 'awards.submit_nomination',
    category: 'Awards',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'authenticated',
    payloadSchema: {
      type: 'object',
      properties: {
        awardId: { type: 'string' },
        nominatorId: { type: 'string' },
        nomineeId: { type: 'string' },
        evidence: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              evidenceType: { type: 'string' },
              referenceId: { type: 'string' },
              sourceContext: { type: 'string' }
            },
            required: ['evidenceType', 'referenceId', 'sourceContext']
          }
        }
      },
      required: ['awardId', 'nominatorId', 'nomineeId']
    }
  },
  {
    id: 'awards.assign_evaluator',
    category: 'Awards',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin',
    payloadSchema: {
      type: 'object',
      properties: {
        awardId: { type: 'string' },
        evaluatorId: { type: 'string' },
        role: { type: 'string' }
      },
      required: ['awardId', 'evaluatorId', 'role']
    }
  },
  {
    id: 'awards.record_evaluation',
    category: 'Awards',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'evaluator',
    payloadSchema: {
      type: 'object',
      properties: {
        awardId: { type: 'string' },
        nominationId: { type: 'string' },
        evaluatorId: { type: 'string' },
        weightedScore: { type: 'number' },
        comments: { type: 'string' },
        recommendation: { type: 'string' }
      },
      required: ['awardId', 'nominationId', 'evaluatorId', 'weightedScore', 'recommendation']
    }
  },
  {
    id: 'awards.finalize',
    category: 'Awards',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin',
    payloadSchema: {
      type: 'object',
      properties: {
        awardId: { type: 'string' },
        nominationId: { type: 'string' },
        decision: { type: 'string' },
        summaryRemarks: { type: 'string' }
      },
      required: ['awardId', 'nominationId', 'decision']
    }
  },
  {
    id: 'awards.publish_results',
    category: 'Awards',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'admin',
    payloadSchema: {
      type: 'object',
      properties: {
        awardId: { type: 'string' }
      },
      required: ['awardId']
    }
  }
];
