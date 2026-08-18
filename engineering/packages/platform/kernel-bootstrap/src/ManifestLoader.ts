export interface KernelRuntimeManifest {
  runtimes: RuntimeConfig[];
  version: string;
}

export interface RuntimeConfig {
  id: string;
  layer: number;
  dependencies: string[];
  status: 'Active' | 'Deprecated';
}

export class ManifestLoader {
  async load(path: string): Promise<KernelRuntimeManifest> {
    console.log(`Kernel Bootstrap: Loading manifest from ${path}`);
    // In a real environment, this reads and parses the JSON file
    return {
      version: '1.0.0',
      runtimes: []
    };
  }
}
