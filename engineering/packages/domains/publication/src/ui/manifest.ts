import { definePlugin } from '@campus-os/presentation-core';
import { PublicationRoutes } from './routes';
import { SubmissionForm } from './forms/SubmissionForm';
import { ReviewForm } from './forms/ReviewForm';
import { AssignmentGrid } from './grids/AssignmentGrid';
import { PipelineWidget } from './widgets/PipelineWidget';

export const PublicationManifest = definePlugin({
  id: 'campus-os-publication',
  version: '1.0.0',
  targetAbi: '1.0',
  capabilities: ['submission', 'review', 'production'],
  routes: PublicationRoutes,
  widgets: {
    'article-pipeline': PipelineWidget
  },
  forms: {
    'submission-form': SubmissionForm,
    'review-form': ReviewForm
  },
  grids: {
    'assignment-grid': AssignmentGrid
  }
});
