import { BaseRuntime } from './BaseRuntime';
import { IPluginRuntime } from '../contracts/IPluginRuntime';

export class PluginRuntime extends BaseRuntime implements IPluginRuntime {
  private activePlugins: string[] = [];

  constructor() {
    super('PluginRuntime');
  }

  async loadPlugin(pluginManifest: any): Promise<void> {
    if (pluginManifest.id) {
      this.activePlugins.push(pluginManifest.id);
    }
  }

  getActivePlugins(): string[] {
    return this.activePlugins;
  }
}
