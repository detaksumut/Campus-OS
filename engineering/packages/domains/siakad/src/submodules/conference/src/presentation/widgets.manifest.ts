import { WidgetDescriptor } from '../../../../../../../presentation-kernel/src/contracts/WidgetDescriptor';

export const ConferenceWidgets: WidgetDescriptor[] = [
  {
    id: 'widget.conference.directory',
    name: 'Conference Directory',
    description: 'Browse active and upcoming conferences.',
    zone: 'Dashboard',
    priority: 1,
    lazy: false,
    version: '1.0.0',
    actions: ['conference.create']
  },
  {
    id: 'widget.conference.paper_submission',
    name: 'Paper Submission Form',
    description: 'Interface for submitting abstracts and papers to a conference track.',
    zone: 'Conference',
    priority: 2,
    lazy: true,
    version: '1.0.0',
    actions: ['conference.submit_paper']
  },
  {
    id: 'widget.conference.reviewer_dashboard',
    name: 'Reviewer Dashboard',
    description: 'Workspace for assigned committee members to review submissions.',
    zone: 'Conference',
    priority: 3,
    lazy: true,
    version: '1.0.0',
    actions: ['conference.record_review']
  },
  {
    id: 'widget.conference.schedule_viewer',
    name: 'Schedule & Presentation Viewer',
    description: 'Displays all scheduled sessions and presentation assignments.',
    zone: 'Conference',
    priority: 4,
    lazy: true,
    version: '1.0.0',
    actions: ['conference.schedule_session']
  }
];
