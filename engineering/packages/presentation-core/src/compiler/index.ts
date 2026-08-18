import { PresentationABI, CompiledModule } from '../abi/PresentationABI';
import { PresentationRegistry } from '../registry';
import { PresentationEventBus } from '../events';

export class PresentationCompiler {
  private registry = new PresentationRegistry();
  private eventBus = new PresentationEventBus();
  private rawManifests: any[] = [];
  private compiledCache: PresentationABI | null = null;

  public addManifest(manifest: any) {
    this.rawManifests.push(manifest);
  }

  public parse(): any[] {
    // 1. Parse TS object
    return this.rawManifests.map(m => {
      if (!m.id || !m.name) throw new Error('Manifest missing id or name');
      return m;
    });
  }

  public validate(parsedManifests: any[]) {
    // 2. Validate shapes
    for (const m of parsedManifests) {
      if (m.widgets && !Array.isArray(m.widgets)) throw new Error(`Invalid widgets array in ${m.id}`);
    }
  }

  public normalize(validManifests: any[]): CompiledModule[] {
    // 3. Expand shorthands
    return validManifests.map(m => ({
      id: m.id,
      name: m.name,
      capabilities: m.capabilities || [],
      permissions: m.permissions || [],
      routes: (m.navigation || []).map((n: any) => ({
        id: n.id,
        path: n.route,
        workbenchId: n.workbenchId,
        children: n.children
      })),
      workbenches: (m.workbenches || []).map((w: any) => ({
        id: w.id,
        layoutId: w.defaultLayout
      })),
      widgets: (m.widgets || []).map((w: any) => ({
        id: w.id,
        componentRef: w.component ? w.component.name : 'UnknownComponent',
        placement: w.defaultPlacement || 'unknown',
        requiredCapabilities: w.capabilities || []
      }))
    }));
  }

  public link(normalizedModules: CompiledModule[]): Record<string, CompiledModule> {
    // 4. Resolve dependencies
    const moduleMap: Record<string, CompiledModule> = {};
    for (const mod of normalizedModules) {
      moduleMap[mod.id] = mod;
    }
    return moduleMap;
  }

  public compile(forceRecompile = false): PresentationABI {
    if (this.compiledCache && !forceRecompile) {
      return this.compiledCache;
    }

    const parsed = this.parse();
    this.validate(parsed);
    const normalized = this.normalize(parsed);
    const linked = this.link(normalized);

    // 5. Generate ABI
    this.compiledCache = {
      version: '1.0.0',
      compiledAt: new Date().toISOString(),
      modules: linked
    };

    return this.compiledCache;
  }

  public generateOutputJSON(): string {
    return JSON.stringify(this.compile(), null, 2);
  }

  public generateHealthReport() {
    const abi = this.compile();
    let orphanRoutes = 0;
    let missingWidgets = 0;

    // A simple heuristic for health report
    Object.values(abi.modules).forEach(m => {
      m.routes.forEach(r => {
        if (!r.workbenchId) orphanRoutes++;
      });
      if (m.widgets.length === 0 && m.workbenches.length > 0) missingWidgets++;
    });

    return {
      compilation: 'PASS',
      orphanRoutes,
      missingWidgets
    };
  }
}
