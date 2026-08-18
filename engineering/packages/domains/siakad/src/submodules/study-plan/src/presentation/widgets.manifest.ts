import { WidgetDescriptor } from '../../../../../../../presentation-kernel/src/contracts/WidgetDescriptor';

export const StudyPlanWidgets: WidgetDescriptor[] = [
  {
    id: 'widget.study_plan.student',
    name: 'My Study Plan (KRS)',
    description: 'Allows students to draft, modify, and submit their study plan.',
    zone: 'StudentDashboard',
    priority: 1,
    lazy: false,
    version: '1.0.0',
    actions: ['study_plan.draft', 'study_plan.add_item']
  },
  {
    id: 'widget.study_plan.advisor',
    name: 'Study Plan Approval',
    description: 'Allows Academic Advisors to approve or reject submitted study plans.',
    zone: 'AcademicAdmin',
    priority: 2,
    lazy: true,
    version: '1.0.0',
    actions: ['study_plan.finalize']
  }
];
