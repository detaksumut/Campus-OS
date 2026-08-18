export interface Tab {
  id: string;
  title: string;
  widgetId: string;
}

export interface Window {
  id: string;
  title: string;
  tabs: Tab[];
  activeTabId?: string;
}

export interface Region {
  id: string;
  type: 'main' | 'sidebar' | 'bottom' | 'floating';
  windows: Window[];
}

export interface Workspace {
  id: string;
  name: string;
  regions: Region[];
}

export interface Workbench {
  id: string;
  activeWorkspaceId?: string;
  workspaces: Workspace[];
}
