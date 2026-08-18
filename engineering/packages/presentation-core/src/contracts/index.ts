export interface IPlugin {
  id: string;
  version: string;
  targetAbi: string;
}

// Router-agnostic navigation contract
export interface INavigationRuntime {
  navigate(path: string, params?: Record<string, string>): void;
  replace(path: string, params?: Record<string, string>): void;
  back(): void;
  current(): string;
}

export interface IPageRuntime {
  render(pageId: string): any; // Framework agnostic return type
}

export interface IWidgetRuntime {
  render(widgetId: string): any;
}
