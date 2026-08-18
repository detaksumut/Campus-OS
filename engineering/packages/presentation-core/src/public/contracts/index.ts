export interface IPlugin {
  id: string;
  version: string;
  targetAbi: string;
}

export interface INavigationRuntime {
  navigate(path: string, params?: Record<string, string>): void;
  replace(path: string, params?: Record<string, string>): void;
  back(): void;
  current(): string;
}

export interface IPageRuntime {
  render(pageId: string): any;
}

export interface IWidgetRuntime {
  render(widgetId: string): any;
}

export interface IFormRuntime {
  render(formId: string): any;
}
