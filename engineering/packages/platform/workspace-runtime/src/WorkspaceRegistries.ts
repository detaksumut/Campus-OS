export class WorkspaceRegistry {
  private static workspaces = new Map<string, any>();
  static register(id: string, metadata: any) { this.workspaces.set(id, metadata); }
}

export class WindowRegistry {
  private static windows = new Map<string, any>();
  static register(id: string, metadata: any) { this.windows.set(id, metadata); }
}

export class LayoutRegistry {
  private static layouts = new Map<string, any>();
  static register(id: string, metadata: any) { this.layouts.set(id, metadata); }
}

export class CommandRegistry {
  private static commands = new Map<string, any>();
  static register(id: string, metadata: any) { this.commands.set(id, metadata); }
}
