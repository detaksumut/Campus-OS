import { IEventBus } from '@campus-os/kernel';
import { WorkspaceState } from './WorkspaceState';
import { WorkspaceEvents } from './WorkspaceEvents';
import { Window } from './models';

export class WindowManager {
  constructor(
    private state: WorkspaceState,
    private eventBus: IEventBus
  ) {}

  async open(window: Window): Promise<void> {
    // Logic to insert window into active workspace
    await this.eventBus.publish(WorkspaceEvents.WindowOpened, { windowId: window.id });
  }

  async close(windowId: string): Promise<void> {
    await this.eventBus.publish(WorkspaceEvents.WindowClosed, { windowId });
  }

  async focus(windowId: string): Promise<void> {}
  async minimize(windowId: string): Promise<void> {}
  async maximize(windowId: string): Promise<void> {}
  async restore(windowId: string): Promise<void> {}
  async detach(windowId: string): Promise<void> {}
  async attach(windowId: string, regionId: string): Promise<void> {}
  async activate(windowId: string): Promise<void> {}
  async deactivate(windowId: string): Promise<void> {}
  async move(windowId: string, x: number, y: number): Promise<void> {}
  async resize(windowId: string, width: number, height: number): Promise<void> {}
  async bringToFront(windowId: string): Promise<void> {}
  async sendToBack(windowId: string): Promise<void> {}
}
