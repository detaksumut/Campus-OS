import { WidgetDescriptor } from '../../../../../../../presentation-kernel/src/contracts/WidgetDescriptor';

export const AdmissionsWidgets: WidgetDescriptor[] = [
  {
    id: 'widget.admissions.portal',
    name: 'Admissions Portal',
    description: 'Landing page for prospective students to view open admission periods.',
    zone: 'Public',
    priority: 1,
    lazy: false,
    version: '1.0.0',
    actions: ['admissions.register']
  },
  {
    id: 'widget.admissions.applicant_dashboard',
    name: 'Applicant Dashboard',
    description: 'Private dashboard for an applicant to submit their application and view status.',
    zone: 'Admissions',
    priority: 2,
    lazy: true,
    version: '1.0.0',
    actions: ['admissions.submit', 'admissions.confirm_enrollment']
  },
  {
    id: 'widget.admissions.selection_board',
    name: 'Selection Board',
    description: 'Panel for evaluators to score applicants across multiple stages.',
    zone: 'AdmissionsAdmin',
    priority: 3,
    lazy: true,
    version: '1.0.0',
    actions: ['admissions.evaluate']
  },
  {
    id: 'widget.admissions.results',
    name: 'Admission Results',
    description: 'Displays the final decisions and enrollment offers.',
    zone: 'Public', // Can be masked depending on privacy
    priority: 4,
    lazy: true,
    version: '1.0.0',
    actions: ['admissions.publish_results']
  },
  {
    id: 'widget.admissions.management',
    name: 'Admissions Management',
    description: 'Control panel for admins to create and manage admission periods.',
    zone: 'AdmissionsAdmin',
    priority: 5,
    lazy: true,
    version: '1.0.0',
    actions: ['admissions.create_period', 'admissions.open_period', 'admissions.issue_offer']
  }
];
