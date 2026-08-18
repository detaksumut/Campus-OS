import { definePlugin } from '@campus-os/presentation-core';
import { CertificationRoutes } from './routes';
import { ApplicationForm } from './forms/ApplicationForm';
import { AssessmentForm } from './forms/AssessmentForm';
import { ExamSessionGrid } from './grids/ExamSessionGrid';
import { CertificateWidget } from './widgets/CertificateWidget';

export const CertificationManifest = definePlugin({
  id: 'campus-os-certification',
  version: '1.0.0',
  targetAbi: '1.0',
  capabilities: ['scheme', 'exam', 'interview'],
  routes: CertificationRoutes,
  widgets: {
    'certificate-badge': CertificateWidget
  },
  forms: {
    'application-form': ApplicationForm,
    'assessment-form': AssessmentForm
  },
  grids: {
    'exam-session-grid': ExamSessionGrid
  }
});
