import { NavigationNode, globalNavigationRegistry } from './NavigationRegistry';
import { WidgetDefinition, globalWidgetRegistry } from './WidgetRegistry';
import { WorkbenchDefinition, globalWorkbenchRegistry } from './WorkbenchRegistry';

export interface ModuleManifest {
  id: string;
  name: string;
  workbenches?: WorkbenchDefinition[];
  widgets?: WidgetDefinition[];
  navigation?: NavigationNode[];
  capabilities?: string[];
  permissions?: string[];
}

export class ModuleRegistry {
  private modules = new Map<string, ModuleManifest>();

  public register(manifest: ModuleManifest): void {
    if (this.modules.has(manifest.id)) {
      throw new Error(`Module with ID ${manifest.id} is already registered.`);
    }

    this.modules.set(manifest.id, manifest);

    // Auto-register components defined in the manifest
    if (manifest.workbenches) {
      manifest.workbenches.forEach(wb => globalWorkbenchRegistry.register(wb));
    }
    if (manifest.widgets) {
      manifest.widgets.forEach(w => globalWidgetRegistry.register(w));
    }
    if (manifest.navigation) {
      manifest.navigation.forEach(n => globalNavigationRegistry.register(n));
    }
  }

  public get(id: string): ModuleManifest | undefined {
    return this.modules.get(id);
  }

  public getAll(): ModuleManifest[] {
    return Array.from(this.modules.values());
  }
}

export const globalModuleRegistry = new ModuleRegistry();
