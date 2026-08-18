import { WidgetDescriptor } from '../../../../../../../presentation-kernel/src/contracts/WidgetDescriptor';

export const StudentWidgets: WidgetDescriptor[] = [
  {
    id: 'widget.student.profile',
    name: 'Student Academic Profile',
    description: 'Displays the student academic status, NIM, and enrollment year.',
    zone: 'StudentDashboard',
    priority: 1,
    lazy: false,
    version: '1.0.0',
    actions: ['student.request_leave']
  },
  {
    id: 'widget.student.management',
    name: 'Student Academic Management',
    description: 'Admin tool to manage student academic status (e.g. graduation, suspension).',
    zone: 'AcademicAdmin',
    priority: 2,
    lazy: true,
    version: '1.0.0',
    actions: ['student.register', 'student.graduate']
  }
];
