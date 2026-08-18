import { RegistrationManifest } from './manifest';
import { RegistrationRoutes } from './routes';
import { RegistrationCapabilities } from './capabilities';
import { RegistrationPermissions } from './permissions';
import { RegistrationWorkbench } from './workbench';
import { RegistrationWidgetsManifest } from './widgets.manifest';
import { RegistrationFormsManifest } from './forms.manifest';
import { RegistrationGridsManifest } from './grids.manifest';
import { RegistrationActionsManifest } from './actions.manifest';

/**
 * Registration Presentation Plugin
 * This is the pure ABI contract exported for the Plugin Loader.
 * It contains zero React Components and ZERO hardcoded implementations.
 */
export const RegistrationPluginABI = {
  manifest: RegistrationManifest,
  routes: RegistrationRoutes,
  capabilities: RegistrationCapabilities,
  permissions: RegistrationPermissions,
  workbench: RegistrationWorkbench,
  widgets: RegistrationWidgetsManifest,
  forms: RegistrationFormsManifest,
  grids: RegistrationGridsManifest,
  actions: RegistrationActionsManifest
};

export default RegistrationPluginABI;
