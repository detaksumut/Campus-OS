export interface RouteDefinition {
  id: string;
  path: string;
  component: string;
  capabilityId: string;
}

class RouteRegistryImpl {
  private routes: Map<string, RouteDefinition> = new Map();

  register(route: RouteDefinition) {
    this.routes.set(route.id, route);
  }

  getRoute(id: string): RouteDefinition | undefined {
    return this.routes.get(id);
  }

  getAll(): RouteDefinition[] {
    return Array.from(this.routes.values());
  }
}

export const RouteRegistry = new RouteRegistryImpl();
