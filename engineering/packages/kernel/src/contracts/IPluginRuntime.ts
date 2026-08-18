import { IRuntime } from './IRuntime';

export interface IPluginRuntime extends IRuntime {
  loadPlugin(pluginManifest: any): Promise<void>;
  getActivePlugins(): string[];
}
