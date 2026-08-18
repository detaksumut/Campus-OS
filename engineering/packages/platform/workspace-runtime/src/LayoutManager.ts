import { IEventBus } from '@campus-os/kernel';
import { WorkspaceState } from './WorkspaceState';
import { IStorageProvider } from './IStorageProvider';
import { WorkspaceEvents } from './WorkspaceEvents';
import { Workspace } from './models';

export class LayoutManager {
  constructor(
    private state: WorkspaceState,
    private eventBus: IEventBus,
    private storage: IStorageProvider
  ) {}

  async persistLayout(workspaceId: string): Promise<void> {
    const workspace = this.state.getWorkbench().workspaces.find(w => w.id === workspaceId);
    if (workspace) {
      await this.storage.set(`layout_${workspaceId}`, workspace);
    }
  }

  async restoreLayout(workspaceId: string): Promise<void> {
    const layout = await this.storage.get<Workspace>(`layout_${workspaceId}`);
    if (layout) {
      // Re-apply layout to state
      await this.eventBus.publish(WorkspaceEvents.LayoutChanged, { workspaceId });
    }
  }
}
