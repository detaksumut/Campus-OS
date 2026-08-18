import { WidgetDescriptor } from '../../../../../../../presentation-kernel/src/contracts/WidgetDescriptor';

export const OrganizationWidgets: WidgetDescriptor[] = [
  {
    id: 'widget.organization.hierarchy',
    name: 'Organization Hierarchy',
    description: 'Visualizes the structural tree of the university, faculties, departments, and study programs.',
    zone: 'Public',
    priority: 1,
    lazy: false,
    version: '1.0.0',
    actions: [] 
  },
  {
    id: 'widget.organization.management',
    name: 'Organization Management',
    description: 'Admin panel to create and modify faculties, departments, study programs, and campuses.',
    zone: 'AcademicAdmin',
    priority: 2,
    lazy: true,
    version: '1.0.0',
    actions: ['organization.create_faculty', 'organization.create_department', 'organization.create_study_program']
  }
];
