export const RegistrationManifest = {
  id: '@campus-os/plugin-registration',
  version: '1.0.0',
  name: 'Student Registration',
  description: 'Core module for managing student admissions and registrations',
  author: 'Campus OS Engineering',
  dependencies: [
    '@campus-os/platform-identity',
    '@campus-os/application-kernel'
  ],
  lifecycle: {
    onInstall: 'RegistrationInstaller',
    onEnable: 'RegistrationEnabler'
  }
};
