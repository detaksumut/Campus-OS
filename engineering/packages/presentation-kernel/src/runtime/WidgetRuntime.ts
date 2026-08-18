import { WidgetFactory } from './WidgetFactory';
import { PresentationRegistry } from '../registry/PresentationRegistry';
import { IWidgetContext } from './IWidgetContext';
import { KernelEventBus } from './KernelEventBus';

/**
 * WidgetRuntime is strictly stateless.
 * It enforces the Widget Lifecycle:
 * Discover ➔ Resolve ➔ Authorize ➔ Load ➔ Initialize ➔ Mount ➔ Refresh ➔ Unmount ➔ Dispose
 */
export class WidgetRuntime {
  private factory: WidgetFactory;
  private bus = KernelEventBus.getInstance();

  constructor(private readonly registry: PresentationRegistry) {
    this.factory = new WidgetFactory();
  }

  async processLifecycle(widgetId: string, context: IWidgetContext): Promise<any> {
    // 1. Discover
    this.bus.emit('WidgetDiscover', 'WidgetRuntime', { widgetId });
    const descriptor = this.registry.widget.get(widgetId);
    if (!descriptor) throw new Error(`[Lifecycle:Discover] Widget ${widgetId} not found in ABI`);

    // 2. Resolve
    this.bus.emit('ProviderResolve', 'WidgetRuntime', { widgetId, provider: descriptor.provider });
    
    // 3. Authorize
    this.bus.emit('WidgetAuthorize', 'WidgetRuntime', { widgetId, permission: descriptor.permission });
    if (context.permissions && !context.permissions.includes(descriptor.permission)) {
      throw new Error(`[Lifecycle:Authorize] User lacks permission ${descriptor.permission}`);
    }

    // 4. Load
    this.bus.emit('WidgetLoad', 'WidgetRuntime', { widgetId });
    const dynamicImportFn = await this.factory.getWidget(descriptor);

    // 5. Initialize
    this.bus.emit('WidgetInitialize', 'WidgetRuntime', { widgetId, telemetryProfile: descriptor.telemetryProfile });

    return {
      moduleLoader: dynamicImportFn,
      descriptor,
      context
    };
  }

  // Exposed for Host to explicitly trigger remaining lifecycle events if needed
  notifyMount(widgetId: string) { 
    this.bus.emit('WidgetMounted', 'WidgetHost', { widgetId }); 
  }
  notifyRefresh(widgetId: string) { 
    this.bus.emit('WidgetRefresh', 'WidgetHost', { widgetId }); 
  }
  notifyUnmount(widgetId: string) { 
    this.bus.emit('WidgetUnmounted', 'WidgetHost', { widgetId }); 
  }
  notifyDispose(widgetId: string) { 
    this.bus.emit('WidgetDispose', 'WidgetHost', { widgetId }); 
  }
  notifyError(widgetId: string, error: any) {
    this.bus.emit('WidgetError', 'WidgetHost', { widgetId, error: error.message || error });
  }
}
