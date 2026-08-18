import { ModuleManifest } from '@campus-os/presentation-core';
import { siakadRoutes } from './routes';
import { siakadWorkbenches } from './workbench';
import { PMBStatsWidget } from './widgets/pmb/PMBStatsWidget';
import { ActiveAdmissionPathWidget } from './widgets/pmb/ActiveAdmissionPathWidget';
import { RecentApplicationsWidget } from './widgets/pmb/RecentApplicationsWidget';

export const siakadManifest: ModuleManifest = {
  id: 'module.siakad',
  name: 'Siakad Module',
  navigation: siakadRoutes,
  workbenches: siakadWorkbenches,
  widgets: [
    {
      id: 'widget.siakad.pmb.stats',
      name: 'PMB Statistics',
      component: PMBStatsWidget,
      defaultPlacement: 'main.left'
    },
    {
      id: 'widget.siakad.pmb.paths',
      name: 'Active Admission Paths',
      component: ActiveAdmissionPathWidget,
      defaultPlacement: 'main.left'
    },
    {
      id: 'widget.siakad.pmb.recent',
      name: 'Recent Applications',
      component: RecentApplicationsWidget,
      defaultPlacement: 'main.right'
    }
  ],
  capabilities: [],
  permissions: []
};
