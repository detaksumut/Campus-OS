import { IRuntime } from '@campus-os/kernel';
import { WorkspaceState } from './WorkspaceState';
import { WindowManager } from './WindowManager';
import { LayoutManager } from './LayoutManager';
import { NavigationManager } from './NavigationManager';
import { SelectionManager } from './SelectionManager';
import { ClipboardManager } from './ClipboardManager';

export class WorkspaceRuntimeModule implements IRuntime {
  readonly name = 'WorkspaceRuntime';

  constructor(
    private state: WorkspaceState,
    private windowManager: WindowManager,
    private layoutManager: LayoutManager,
    private navManager: NavigationManager,
    private selectionManager: SelectionManager,
    private clipboardManager: ClipboardManager
  ) {}

  async initialize(): Promise<void> {}
  async configure(config: any): Promise<void> {}
  async validate(): Promise<void> {}
  async start(): Promise<void> {}
  async ready(): Promise<void> {}
  async stop(): Promise<void> {}
  async dispose(): Promise<void> {}
}
