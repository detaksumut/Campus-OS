import { WidgetDescriptor } from '../../../../../../../presentation-kernel/src/contracts/WidgetDescriptor';

export const CourseOfferingWidgets: WidgetDescriptor[] = [
  {
    id: 'widget.course_offering.public',
    name: 'Public Course Offerings',
    description: 'Displays the list of classes offered this semester.',
    zone: 'Public',
    priority: 1,
    lazy: false,
    version: '1.0.0',
    actions: []
  },
  {
    id: 'widget.course_offering.management',
    name: 'Course Offering Management',
    description: 'Admin tool for managing classes, sections, and teaching assignments.',
    zone: 'AcademicAdmin',
    priority: 2,
    lazy: true,
    version: '1.0.0',
    actions: ['course_offering.draft', 'course_offering.add_section', 'course_offering.publish']
  }
];
