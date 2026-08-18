export class PageService {
  constructor(private registrySnapshot: any) {}

  findByRoute(route: string): any {
    return null;
  }
}

export class WidgetService {
  constructor(private registrySnapshot: any) {}

  resolve(widgetId: string): any {
    return null;
  }
}

export class NavigationService {
  constructor(private registrySnapshot: any) {}

  getMenus(identity: any): any[] {
    return [];
  }
}
