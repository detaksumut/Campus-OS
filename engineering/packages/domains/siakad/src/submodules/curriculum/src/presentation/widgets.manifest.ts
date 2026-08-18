import { WidgetDescriptor } from '../../../../../../../presentation-kernel/src/contracts/WidgetDescriptor';

export const CurriculumWidgets: WidgetDescriptor[] = [
  {
    id: 'widget.curriculum.public_view',
    name: 'Public Curriculum Explorer',
    description: 'Allows students to view courses and learning outcomes for a specific study program.',
    zone: 'Public',
    priority: 1,
    lazy: false,
    version: '1.0.0',
    actions: []
  },
  {
    id: 'widget.curriculum.management',
    name: 'Curriculum Builder',
    description: 'Admin tool for defining courses, learning outcomes, and constructing program curricula.',
    zone: 'AcademicAdmin',
    priority: 2,
    lazy: true,
    version: '1.0.0',
    actions: ['curriculum.create_course', 'curriculum.define', 'curriculum.add_course']
  }
];
