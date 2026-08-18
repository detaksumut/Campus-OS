import { Workbench, Workspace, Region, Window, Tab } from './models';

export class WorkspaceState {
  private workbench: Workbench = {
    id: 'default-workbench',
    workspaces: []
  };

  getWorkbench(): Workbench {
    return this.workbench;
  }

  getActiveWorkspace(): Workspace | undefined {
    return this.workbench.workspaces.find(w => w.id === this.workbench.activeWorkspaceId);
  }
}
