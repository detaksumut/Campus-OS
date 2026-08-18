import { WidgetDescriptor } from '../../../../../../../presentation-kernel/src/contracts/WidgetDescriptor';

export const ResearchWidgets: WidgetDescriptor[] = [
  {
    id: 'widget.research.dashboard',
    name: 'Research Dashboard',
    description: 'Overview of active research projects and funding for an investigator.',
    zone: 'Dashboard',
    priority: 1,
    lazy: false,
    version: '1.0.0',
    actions: ['research.create_project', 'research.assign_member']
  },
  {
    id: 'widget.research.proposal_submission',
    name: 'Proposal Submission Form',
    description: 'Interface for drafting and submitting research proposals.',
    zone: 'Dashboard',
    priority: 2,
    lazy: true,
    version: '1.0.0',
    actions: ['research.submit_proposal']
  },
  {
    id: 'widget.research.project_management',
    name: 'Project Management & Milestones',
    description: 'Kanban/Timeline view for managing research milestones.',
    zone: 'Dashboard',
    priority: 3,
    lazy: true,
    version: '1.0.0',
    actions: ['research.record_milestone', 'research.complete_project']
  },
  {
    id: 'widget.research.output_registry',
    name: 'Research Output Registry',
    description: 'Form to register journals, patents, and other research outputs.',
    zone: 'Dashboard',
    priority: 4,
    lazy: true,
    version: '1.0.0',
    actions: ['research.register_output']
  }
];
