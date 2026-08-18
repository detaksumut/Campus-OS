export type KernelEventType = 
  | 'WidgetDiscover' | 'ProviderResolve' | 'WidgetAuthorize' | 'WidgetLoad' 
  | 'WidgetInitialize' | 'WidgetMounted' | 'WidgetRefresh' | 'WidgetUnmounted' | 'WidgetDispose'
  | 'ActionExecuted' | 'ActionAudit' | 'RuntimeReload' | 'RegistryUpdated' | 'WidgetError';

export interface KernelEvent {
  id: string;
  timestamp: number;
  type: KernelEventType;
  payload: any;
  source: string;
}

type Listener = (event: KernelEvent) => void;

export class KernelEventBus {
  private listeners: Listener[] = [];
  private history: KernelEvent[] = [];
  
  // Singleton for simplicity in this frontend shell demo
  private static instance: KernelEventBus;
  public static getInstance(): KernelEventBus {
    if (!KernelEventBus.instance) KernelEventBus.instance = new KernelEventBus();
    return KernelEventBus.instance;
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  emit(type: KernelEventType, source: string, payload: any) {
    const event: KernelEvent = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
      timestamp: Date.now(),
      type,
      source,
      payload
    };
    
    this.history.push(event);
    
    // Keep history bounded to prevent memory leaks (e.g. 1000 events max)
    if (this.history.length > 1000) this.history.shift();
    
    this.listeners.forEach(listener => {
      try { listener(event); } catch (e) { console.error('Observer error', e); }
    });
  }

  getHistory() {
    return this.history;
  }
}
