import { KernelRuntimeManifest, RuntimeConfig } from './ManifestLoader';

export class DependencyResolver {
  resolve(manifest: KernelRuntimeManifest): RuntimeConfig[] {
    console.log("Kernel Bootstrap: Resolving dependency graph...");
    
    const runtimes = manifest.runtimes;
    const sorted: RuntimeConfig[] = [];
    const visited = new Set<string>();
    const visiting = new Set<string>();

    const visit = (runtimeId: string) => {
      if (visiting.has(runtimeId)) {
        throw new Error(`Circular dependency detected involving runtime: ${runtimeId}`);
      }
      if (!visited.has(runtimeId)) {
        visiting.add(runtimeId);
        
        const runtime = runtimes.find(r => r.id === runtimeId);
        if (!runtime) {
           throw new Error(`Missing dependency runtime: ${runtimeId}`);
        }

        for (const dep of runtime.dependencies) {
          visit(dep);
        }

        visiting.delete(runtimeId);
        visited.add(runtimeId);
        sorted.push(runtime);
      }
    };

    for (const runtime of runtimes) {
      if (!visited.has(runtime.id)) {
        visit(runtime.id);
      }
    }

    return sorted;
  }
}
