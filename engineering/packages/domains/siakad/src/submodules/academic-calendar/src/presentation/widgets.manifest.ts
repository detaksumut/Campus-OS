import { WidgetDescriptor } from '../../../../../../../presentation-kernel/src/contracts/WidgetDescriptor';

export const CalendarWidgets: WidgetDescriptor[] = [
  {
    id: 'widget.calendar.public_view',
    name: 'Public Academic Calendar',
    description: 'Displays active academic periods and key dates for students and faculty.',
    zone: 'Public',
    priority: 1,
    lazy: false,
    version: '1.0.0',
    actions: [] // Read only
  },
  {
    id: 'widget.calendar.management',
    name: 'Calendar Management',
    description: 'Admin panel to define academic years, semesters, and operational periods.',
    zone: 'AcademicAdmin',
    priority: 2,
    lazy: true,
    version: '1.0.0',
    actions: ['calendar.create', 'calendar.define_period', 'calendar.publish']
  }
];
