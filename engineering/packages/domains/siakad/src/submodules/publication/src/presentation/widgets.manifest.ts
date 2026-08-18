import { WidgetDescriptor } from '../../../../../../../presentation-kernel/src/contracts/WidgetDescriptor';

export const PublicationWidgets: WidgetDescriptor[] = [
  {
    id: 'widget.publication.submission',
    name: 'Manuscript Submission Form',
    description: 'Widget for authors to submit manuscripts.',
    zone: 'Content',
    priority: 1,
    lazy: false,
    version: '1.0.0',
    actions: ['publication.submit_manuscript']
  },
  {
    id: 'widget.publication.author_dashboard',
    name: 'Author Publication Dashboard',
    description: 'Dashboard displaying submission statuses for an author.',
    zone: 'Dashboard',
    priority: 1,
    lazy: true,
    version: '1.0.0',
    actions: []
  },
  {
    id: 'widget.publication.reviewer_dashboard',
    name: 'Reviewer Dashboard',
    description: 'Dashboard displaying assigned reviews and pending actions for a reviewer.',
    zone: 'Dashboard',
    priority: 1,
    lazy: true,
    version: '1.0.0',
    actions: ['publication.submit_review']
  },
  {
    id: 'widget.publication.editor_dashboard',
    name: 'Editor Dashboard',
    description: 'Dashboard for editors to manage assignments and decisions.',
    zone: 'Dashboard',
    priority: 1,
    lazy: true,
    version: '1.0.0',
    actions: ['publication.assign_reviewer', 'publication.make_decision', 'publication.publish_article']
  }
];
