import { defineForm } from '@campus-os/presentation-core';

export const VerificationForm = defineForm({
  id: 'verification-form',
  fields: [
    { name: 'memberId', type: 'text', label: 'Member ID', required: true },
    { name: 'decision', type: 'select', label: 'Decision', options: ['APPROVE', 'REJECT'] },
    { name: 'notes', type: 'textarea', label: 'Verification Notes' },
    { name: 'submit', type: 'submit', label: 'Process Verification' }
  ],
  submissionPipeline: 'MembershipCommandApplicationService/verifyMembership'
});
