import { ZoneType } from './WorkbenchDescriptor';

export type WidgetPriority = 'high' | 'normal' | 'low';

export interface WidgetDescriptor {
  id: string;
  name: string;
  version: string;
  zone: ZoneType;
  capabilities: string[];
  dependencies: string[];
  lifecycle: 'singleton' | 'transient';
  actions: string[]; // List of Action IDs this widget can dispatch
  permissions: string[];
  priority: WidgetPriority;
  lazy: boolean;
}
