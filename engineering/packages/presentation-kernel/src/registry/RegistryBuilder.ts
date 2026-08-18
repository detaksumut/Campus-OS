import { PresentationRegistry } from './PresentationRegistry';
import { ABIPlugin } from '../compiler/PresentationCompiler';

export class RegistryBuilder {
  constructor(private readonly registry: PresentationRegistry) {}

  buildFromABI(abi: ABIPlugin) {
    if (abi.routes) {
      abi.routes.forEach(route => this.registry.registerNavigation(route));
    }
    
    if (abi.workbench) {
      this.registry.registerWorkbench(abi.workbench);
      // Register individual zones from workbench
      if (abi.workbench.zones) {
        Object.keys(abi.workbench.zones).forEach(zoneKey => {
          this.registry.registerZone(`${abi.workbench!.id}:${zoneKey}`, abi.workbench!.zones[zoneKey]);
        });
      }
    }
    
    if (abi.widgets) {
      abi.widgets.forEach(widget => this.registry.registerWidget(widget));
    }
    
    if (abi.actions) {
      abi.actions.forEach(action => this.registry.registerAction(action));
    }
  }
}
