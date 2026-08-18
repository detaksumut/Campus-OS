import { RegistrationPresentationContract, RegistrationPresentationCapability } from './contracts/RegistrationPresentationContract';

export class RegistrationPresentationPlugin {
  public registerRoutes(): string[] {
    return [
      '/registration/dashboard',
      '/registration/apply',
      '/registration/status'
    ];
  }

  public registerWidgets(): string[] {
    return [
      'registration.dashboard',
      'registration.status',
      'registration.profile',
      'registration.documents',
      'registration.timeline'
    ];
  }

  public registerMenus(): any[] {
    return [
      { id: 'menu_registration_dashboard', label: 'PMB Dashboard', path: '/registration/dashboard' }
    ];
  }

  public registerCapabilities(): RegistrationPresentationCapability[] {
    return Object.values(RegistrationPresentationCapability);
  }
}
