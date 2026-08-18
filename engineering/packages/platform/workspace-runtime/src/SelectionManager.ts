import { IEventBus } from '@campus-os/kernel';
import { WorkspaceEvents } from './WorkspaceEvents';

export class SelectionManager {
  private currentWorkspace?: string;
  private currentWindow?: string;
  private currentTab?: string;
  private currentPanel?: string;
  private currentObject?: string;

  constructor(private eventBus: IEventBus) {}

  async selectWorkspace(id: string) { 
    this.currentWorkspace = id; 
    await this.notify();
  }
  
  async selectWindow(id: string) {
    this.currentWindow = id;
    await this.notify();
  }
  
  async selectTab(id: string) {
    this.currentTab = id;
    await this.notify();
  }
  
  async selectObject(id: string) {
    this.currentObject = id;
    await this.notify();
  }

  private async notify() {
    await this.eventBus.publish(WorkspaceEvents.SelectionChanged, {
      workspace: this.currentWorkspace,
      window: this.currentWindow,
      tab: this.currentTab,
      object: this.currentObject
    });
  }
}
