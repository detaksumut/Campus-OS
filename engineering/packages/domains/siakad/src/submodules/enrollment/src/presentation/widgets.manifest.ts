import { WidgetDescriptor } from '../../../../../../../presentation-kernel/src/contracts/WidgetDescriptor';

export const EnrollmentWidgets: WidgetDescriptor[] = [
  {
    id: 'widget.enrollment.class_roster',
    name: 'Class Roster',
    description: 'Displays the list of enrolled students in a specific class section.',
    zone: 'AcademicAdmin',
    priority: 1,
    lazy: false,
    version: '1.0.0',
    actions: ['enrollment.drop']
  }
];
