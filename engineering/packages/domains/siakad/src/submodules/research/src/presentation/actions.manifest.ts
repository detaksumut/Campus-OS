import { ActionDescriptor } from '../../../../../../../presentation-kernel/src/contracts/ActionDescriptor';

export const ResearchActions: ActionDescriptor[] = [
  {
    id: 'research.create_project',
    category: 'Research',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'authenticated', // Will be verified via port
    payloadSchema: {
      type: 'object',
      properties: {
        principalInvestigatorId: { type: 'string' },
        proposalTitle: { type: 'string' },
        proposalAbstract: { type: 'string' },
        proposalMethodology: { type: 'string' }
      },
      required: ['principalInvestigatorId', 'proposalTitle', 'proposalAbstract', 'proposalMethodology']
    }
  },
  {
    id: 'research.submit_proposal',
    category: 'Research',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'investigator',
    payloadSchema: {
      type: 'object',
      properties: {
        projectId: { type: 'string' }
      },
      required: ['projectId']
    }
  },
  {
    id: 'research.assign_member',
    category: 'Research',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'investigator',
    payloadSchema: {
      type: 'object',
      properties: {
        projectId: { type: 'string' },
        memberId: { type: 'string' },
        role: { type: 'string' }
      },
      required: ['projectId', 'memberId', 'role']
    }
  },
  {
    id: 'research.record_milestone',
    category: 'Research',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'investigator',
    payloadSchema: {
      type: 'object',
      properties: {
        projectId: { type: 'string' },
        milestoneTitle: { type: 'string' },
        description: { type: 'string' },
        targetDate: { type: 'string', format: 'date-time' },
        dependentMilestoneId: { type: 'string' }
      },
      required: ['projectId', 'milestoneTitle', 'description', 'targetDate']
    }
  },
  {
    id: 'research.register_output',
    category: 'Research',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'investigator',
    payloadSchema: {
      type: 'object',
      properties: {
        projectId: { type: 'string' },
        outputType: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        publicationSubmissionId: { type: 'string' }
      },
      required: ['projectId', 'outputType', 'title', 'description']
    }
  },
  {
    id: 'research.complete_project',
    category: 'Research',
    idempotent: false,
    retryPolicy: { maxAttempts: 1, backoffMs: 0 },
    version: '1.0.0',
    permission: 'investigator',
    payloadSchema: {
      type: 'object',
      properties: {
        projectId: { type: 'string' }
      },
      required: ['projectId']
    }
  }
];
