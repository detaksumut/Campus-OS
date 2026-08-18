import { WidgetDescriptor } from '../../../../../../../presentation-kernel/src/contracts/WidgetDescriptor';

export const RegistrationWidgets: WidgetDescriptor[] = [
  {
    id: 'widget.registration.login',
    name: 'User Login Form',
    description: 'Widget for authenticating existing users.',
    zone: 'Content',
    priority: 1,
    lazy: false,
    version: '1.0.0',
    actions: ['auth.login']
  },
  {
    id: 'widget.registration.signup',
    name: 'User Registration Form',
    description: 'Widget for enrolling new users into Campus OS.',
    zone: 'Content',
    priority: 2,
    lazy: true,
    version: '1.0.0',
    actions: ['registration.submit']
  }
];
