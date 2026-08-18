export class PresentationRegistry {
  public navigation = new Map<string, any>();
  public workbench = new Map<string, any>();
  public zone = new Map<string, any>();
  public widget = new Map<string, any>();
  public action = new Map<string, any>();

  registerNavigation(route: any) {
    this.navigation.set(route.path, route);
  }

  registerWorkbench(workbench: any) {
    this.workbench.set(workbench.id, workbench);
  }

  registerZone(zoneId: string, zoneConfig: any) {
    this.zone.set(zoneId, zoneConfig);
  }

  registerWidget(widget: any) {
    this.widget.set(widget.id, widget);
  }

  registerAction(action: any) {
    this.action.set(action.id, action);
  }
}

export const GlobalRegistry = new PresentationRegistry();
