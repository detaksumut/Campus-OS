import { WidgetDescriptor } from '../../../../../../../presentation-kernel/src/contracts/WidgetDescriptor';

export const CertificationWidgets: WidgetDescriptor[] = [
  {
    id: 'widget.certification.candidate_dashboard',
    name: 'Candidate Certification Dashboard',
    description: 'Dashboard for candidates to view application status, exams, and interviews.',
    zone: 'Dashboard',
    priority: 1,
    lazy: false,
    version: '1.0.0',
    actions: ['certification.apply', 'certification.submit_exam']
  },
  {
    id: 'widget.certification.assessor_dashboard',
    name: 'Assessor Certification Dashboard',
    description: 'Dashboard for assessors to view assigned interviews and record scores.',
    zone: 'Dashboard',
    priority: 1,
    lazy: true,
    version: '1.0.0',
    actions: ['certification.record_interview']
  },
  {
    id: 'widget.certification.verification',
    name: 'Certificate Verification Form',
    description: 'Publicly accessible widget to verify the authenticity of a certificate.',
    zone: 'Public',
    priority: 1,
    lazy: true,
    version: '1.0.0',
    actions: ['certification.verify_certificate']
  }
];
