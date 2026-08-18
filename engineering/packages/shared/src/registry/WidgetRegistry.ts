export interface WidgetDefinition {
  id: string;
  name: string;
  capabilityId: string;
  defaultSize: 'sm' | 'md' | 'lg' | 'xl';
  componentName: string; // The React component name to dynamically load
}

class WidgetRegistryImpl {
  private widgets: Map<string, WidgetDefinition> = new Map();

  register(widget: WidgetDefinition) {
    this.widgets.set(widget.id, widget);
  }

  getWidget(id: string): WidgetDefinition | undefined {
    return this.widgets.get(id);
  }

  getAll(): WidgetDefinition[] {
    return Array.from(this.widgets.values());
  }
}

export const WidgetRegistry = new WidgetRegistryImpl();
