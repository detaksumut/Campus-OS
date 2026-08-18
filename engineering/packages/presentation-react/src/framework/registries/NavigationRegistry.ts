export interface NavigationNode {
  id: string;
  label: string;
  route: string;
  moduleId: string;
  workbenchId: string;
  icon?: string;
  children?: NavigationNode[];
  permissions?: string[];
}

export class NavigationRegistry {
  private nodes: NavigationNode[] = [];

  public register(node: NavigationNode): void {
    this.nodes.push(node);
  }

  public getNodes(): NavigationNode[] {
    return this.nodes;
  }
}

export const globalNavigationRegistry = new NavigationRegistry();
