import { ComponentType } from 'react';

export interface WidgetDefinition {
  id: string;
  component: ComponentType<any>;
  capabilities?: string[];
  permissions?: string[];
  defaultPlacement?: string;
}

export class WidgetRegistry {
  private widgets = new Map<string, WidgetDefinition>();

  public register(widget: WidgetDefinition): void {
    if (this.widgets.has(widget.id)) {
      throw new Error(`Widget with ID ${widget.id} is already registered.`);
    }
    this.widgets.set(widget.id, widget);
  }

  public get(id: string): WidgetDefinition | undefined {
    return this.widgets.get(id);
  }

  public getAll(): WidgetDefinition[] {
    return Array.from(this.widgets.values());
  }
}

export const globalWidgetRegistry = new WidgetRegistry();
