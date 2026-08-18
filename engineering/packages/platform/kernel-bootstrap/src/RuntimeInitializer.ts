import { RuntimeConfig } from './ManifestLoader';

export class RuntimeInitializer {
  async initialize(runtime: RuntimeConfig): Promise<void> {
    console.log(`Kernel Bootstrap: Initializing runtime [${runtime.id}]...`);
    // Logic to instantiate the runtime class and call its init() hook
  }
}

export class RegistryInitializer {
  async initialize(runtime: RuntimeConfig): Promise<void> {
    console.log(`Kernel Bootstrap: Loading registries for [${runtime.id}]...`);
    // Logic to parse and register the runtime's widget, route, and action manifests
  }
}
