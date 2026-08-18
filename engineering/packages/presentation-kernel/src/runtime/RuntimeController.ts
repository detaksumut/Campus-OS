import { PresentationRegistry } from '../registry/PresentationRegistry';
import { WidgetRuntime } from './WidgetRuntime';
import { KernelEventBus } from './KernelEventBus';

export class RuntimeController {
  private bus = KernelEventBus.getInstance();

  constructor(
    private readonly registry: PresentationRegistry,
    private readonly runtime: WidgetRuntime
  ) {}

  /**
   * Forces the React tree to unmount and remount a widget.
   * This is a simplified hot reload simulation for PF-4.
   */
  reloadWidget(widgetId: string) {
    this.bus.emit('RuntimeReload', 'RuntimeController', { target: 'widget', id: widgetId });
    // Note: The actual remount logic is typically handled by the WidgetHost 
    // listening to this event or via a unique key change in React.
  }

  reloadProvider(providerName: string) {
    this.bus.emit('RuntimeReload', 'RuntimeController', { target: 'provider', id: providerName });
  }

  reloadRegistry() {
    this.bus.emit('RuntimeReload', 'RuntimeController', { target: 'registry' });
  }

  reloadWorkbench(workbenchId: string) {
    this.bus.emit('RuntimeReload', 'RuntimeController', { target: 'workbench', id: workbenchId });
  }
}
