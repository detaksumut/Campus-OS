export class NavigationManager {
  async navigate(path: string): Promise<void> {}
  async back(): Promise<void> {}
  async forward(): Promise<void> {}
  async getHistory(): Promise<string[]> { return []; }
  async getRecent(): Promise<string[]> { return []; }
  async getBreadcrumb(): Promise<string[]> { return []; }
  async handleDeepLink(url: string): Promise<void> {}
}
