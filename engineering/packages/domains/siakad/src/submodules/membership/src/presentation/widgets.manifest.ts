import { WidgetDescriptor } from '../../../../../../../presentation-kernel/src/contracts/WidgetDescriptor';

export const MembershipWidgets: WidgetDescriptor[] = [
  {
    id: 'widget.membership.registration',
    name: 'Membership Profile Registration Form',
    description: 'Widget for existing identities to complete their academic profile.',
    zone: 'Content',
    priority: 1,
    lazy: false,
    version: '1.0.0',
    actions: ['membership.create']
  },
  {
    id: 'widget.membership.dashboard',
    name: 'Membership Dashboard',
    description: 'Widget displaying member status and academic summary.',
    zone: 'Dashboard',
    priority: 1,
    lazy: true,
    version: '1.0.0',
    actions: []
  },
  {
    id: 'widget.membership.digital_card',
    name: 'Digital Member Card',
    description: 'Widget displaying the scannable QR Code for the Digital Member Card.',
    zone: 'Sidebar',
    priority: 2,
    lazy: true,
    version: '1.0.0',
    actions: []
  }
];
