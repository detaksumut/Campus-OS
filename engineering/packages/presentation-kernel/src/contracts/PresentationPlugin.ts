import { ActionDescriptor } from './ActionDescriptor';
import { WorkbenchDescriptor } from './WorkbenchDescriptor';
import { WidgetDescriptor } from './WidgetDescriptor';

export interface RouteDescriptor {
  path: string;
  workbenchId: string;
  permissions?: string[];
}

export interface PresentationPlugin {
  id: string;
  name: string;
  version: string;
  routes: RouteDescriptor[];
  actions: ActionDescriptor[];
  widgets: WidgetDescriptor[];
  workbenches: WorkbenchDescriptor[];
  navigation: {
    menuGroup: string;
    items: Array<{ label: string; routePath: string; icon?: string }>;
  };
  permissions: string[];
}
