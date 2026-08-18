import { WidgetDescriptor } from '../../../../../../../presentation-kernel/src/contracts/WidgetDescriptor';

export const AwardsWidgets: WidgetDescriptor[] = [
  {
    id: 'widget.awards.directory',
    name: 'Awards Directory',
    description: 'Browse active and historical award programs.',
    zone: 'Dashboard',
    priority: 1,
    lazy: false,
    version: '1.0.0',
    actions: ['awards.create_program']
  },
  {
    id: 'widget.awards.nomination_form',
    name: 'Nomination Form',
    description: 'Submit an academic or peer for an award with supporting evidence.',
    zone: 'Awards',
    priority: 2,
    lazy: true,
    version: '1.0.0',
    actions: ['awards.submit_nomination']
  },
  {
    id: 'widget.awards.evaluator_dashboard',
    name: 'Evaluator Dashboard',
    description: 'Workspace for committee members to review nominations and submit scores.',
    zone: 'Awards',
    priority: 3,
    lazy: true,
    version: '1.0.0',
    actions: ['awards.record_evaluation']
  },
  {
    id: 'widget.awards.results_showcase',
    name: 'Award Results Showcase',
    description: 'Public display of award winners and honorees.',
    zone: 'Awards',
    priority: 4,
    lazy: true,
    version: '1.0.0',
    actions: ['awards.publish_results']
  }
];
