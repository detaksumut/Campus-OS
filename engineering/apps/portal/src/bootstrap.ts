import { MenuRegistry, WidgetRegistry, RouteRegistry } from '@campus-os/shared';
import { CapabilityRegistry } from '@campus-os/identity-sdk';
import { ServiceContainer, EventBus, EnvironmentConfigurationProvider } from '@campus-os/kernel';
import { AuthenticationRuntime } from '@campus-os/identity-runtime/src/AuthenticationRuntime';
import { ObservabilityRuntimeModule, HealthRuntime, LoggerRuntime, MetricsRuntime, TelemetryRuntime, TracingRuntime, AuditRuntime } from '@campus-os/observability-runtime';
import { WorkspaceRuntimeModule, WorkspaceState, WindowManager, LayoutManager, NavigationManager, SelectionManager, ClipboardManager } from '@campus-os/workspace-runtime';

export class CampusOS {
  private container!: ServiceContainer;
  private config!: EnvironmentConfigurationProvider;
  private eventBus!: EventBus;

  async bootstrap() {
    console.info('🚀 [Kernel] Bootstrapping Campus OS (Declarative Pipeline)...');
    await this.loadConfiguration();
    await this.createContainer();
    await this.loadKernel();
    await this.loadPlatformRuntimes();
    await this.loadDomainRuntimes();
    await this.initializeRegistry();
    await this.mountApplication();
  }

  private async loadConfiguration() {
    this.config = new EnvironmentConfigurationProvider();
  }

  private async createContainer() {
    this.container = new ServiceContainer();
    this.container.register('IConfiguration', 'Singleton', () => this.config);
  }

  private async loadKernel() {
    this.eventBus = new EventBus();
    this.container.register('IEventBus', 'Singleton', () => this.eventBus);
  }

  private async loadPlatformRuntimes() {
    // 1. Observability Platform
    const health = new HealthRuntime(this.eventBus);
    const logger = new LoggerRuntime(this.eventBus);
    const metrics = new MetricsRuntime(this.eventBus);
    const telemetry = new TelemetryRuntime(this.eventBus);
    const tracing = new TracingRuntime(this.eventBus);
    const audit = new AuditRuntime(this.eventBus);
    
    const observability = new ObservabilityRuntimeModule(health, logger, metrics, telemetry, tracing, audit);
    this.container.register('IObservability', 'Singleton', () => observability);

    // 2. Identity Platform
    const authRuntime = new AuthenticationRuntime(this.eventBus);
    this.container.register('IAuthentication', 'Singleton', () => authRuntime);

    // 3. Workspace Platform (Mocked dependencies for storage)
    const mockStorage = { get: async () => null, set: async () => {}, remove: async () => {} };
    const workspaceState = new WorkspaceState();
    
    const workspaceRuntime = new WorkspaceRuntimeModule(
      workspaceState,
      new WindowManager(workspaceState, this.eventBus),
      new LayoutManager(workspaceState, this.eventBus, mockStorage),
      new NavigationManager(),
      new SelectionManager(this.eventBus),
      new ClipboardManager()
    );
    this.container.register('IWorkspace', 'Singleton', () => workspaceRuntime);
  }

  private async loadDomainRuntimes() {
    // Placeholder for Phase 3+ (Membership, Publication, Certification)
    // Plugins will be loaded dynamically via Manifests here
  }

  private async initializeRegistry() {
    // Register Base Capabilities
    CapabilityRegistry.register({
      id: 'core.dashboard', name: 'View Executive Dashboard', module: 'core', category: 'dashboard', description: '', system: true
    });
    
    // Build Registry (Metadata-Driven CBAC)
    MenuRegistry.register({
      id: 'dashboard', label: 'Beranda', icon: 'LayoutDashboard', path: '/', requiredCapabilities: ['core.dashboard']
    });

    // Simulate Auth
    const auth = this.container.resolve<AuthenticationRuntime>('IAuthentication');
    await auth.authenticate({ user: 'demo', pass: 'demo' });
  }

  private async mountApplication() {
    // Expose container globally for React (Temporary until context is fully mounted)
    (window as any).__KERNEL__ = this.container;
    console.info('✅ [Kernel] Boot sequence complete. Handing over to React Binding Layer.');
  }
}

export const bootstrap = () => new CampusOS().bootstrap();
