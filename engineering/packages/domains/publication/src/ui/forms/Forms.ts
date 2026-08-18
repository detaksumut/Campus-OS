import { defineForm } from '@campus-os/presentation-core';

export const SubmissionForm = defineForm({
  id: 'submission-form',
  fields: [
    { name: 'title', type: 'text', label: 'Article Title', required: true },
    { name: 'abstract', type: 'textarea', label: 'Abstract', required: true },
    { name: 'manuscript', type: 'file', label: 'Upload Manuscript (PDF)' },
    { name: 'submit', type: 'submit', label: 'Submit Article' }
  ],
  submissionPipeline: 'PublicationCommandApplicationService/submitManuscript'
});

export const ReviewForm = defineForm({
  id: 'review-form',
  fields: [
    { name: 'articleId', type: 'text', label: 'Article ID', required: true },
    { name: 'decision', type: 'select', label: 'Decision', options: ['ACCEPT', 'REVISE', 'REJECT'] },
    { name: 'comments', type: 'textarea', label: 'Blind Review Comments' },
    { name: 'submit', type: 'submit', label: 'Submit Review' }
  ],
  submissionPipeline: 'PublicationCommandApplicationService/submitReview'
});
