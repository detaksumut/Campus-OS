import { IRuntime } from '@campus-os/kernel-core';
import { IManifestReader, RuntimeManifest } from './ManifestReader';

export interface IPluginLoader {
  loadPlugin(manifestPath: string): Promise<IRuntime>;
}

export class PluginLoader implements IPluginLoader {
  constructor(private reader: IManifestReader) {}

  async loadPlugin(manifestPath: string): Promise<IRuntime> {
    const manifest = await this.reader.readManifest(manifestPath);
    // Placeholder implementation for plugin loading
    throw new Error(`Plugin loader not fully implemented for ${manifest.id}`);
  }
}
