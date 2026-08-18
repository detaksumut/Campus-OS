import { WorkbenchDescriptor } from '@campus-os/presentation-kernel/contracts/WorkbenchDescriptor';

export const RegistrationWorkbenches: WorkbenchDescriptor[] = [
  {
    id: 'RegistrationMasterDetail',
    name: 'Registration Master Detail Workbench',
    zones: [
      { id: 'reg-nav', type: 'Navigation', name: 'Registration Navigation' },
      { id: 'reg-sidebar', type: 'Sidebar', name: 'Registration List & Filters' },
      { id: 'reg-content', type: 'Content', name: 'Registration Form Details' },
      { id: 'reg-inspector', type: 'Inspector', name: 'Validation & Activity' }
    ]
  }
];
