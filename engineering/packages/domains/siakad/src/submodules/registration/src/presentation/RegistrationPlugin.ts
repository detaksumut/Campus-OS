import { PresentationPlugin } from '@campus-os/presentation-kernel/contracts/PresentationPlugin';
import { RegistrationActions } from './actions.manifest';
import { RegistrationWorkbenches } from './workbench.manifest';
import { RegistrationWidgets } from './widgets.manifest';

export const RegistrationPresentationPlugin: PresentationPlugin = {
  id: 'siakad-registration-plugin',
  name: 'SIAKAD Registration Plugin',
  version: '1.0.0',
  routes: [
    {
      path: '/siakad/registration',
      workbenchId: 'RegistrationMasterDetail',
      permissions: ['registration:access']
    }
  ],
  actions: RegistrationActions,
  widgets: RegistrationWidgets,
  workbenches: RegistrationWorkbenches,
  navigation: {
    menuGroup: 'Academic',
    items: [
      { label: 'Student Registration', routePath: '/siakad/registration', icon: 'UserPlus' }
    ]
  },
  permissions: [
    'registration:access',
    'registration:read',
    'registration:submit',
    'registration:approve'
  ]
};
