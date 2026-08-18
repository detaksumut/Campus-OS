import { SDKContext } from '../context/SDKContext';
import { IPluginRuntime } from '../../../kernel/src/contracts/IPluginRuntime';

export class Plugin {
  private static get runtime(): IPluginRuntime {
    return SDKContext.getRuntime<IPluginRuntime>('PluginRuntime');
  }

  static async load(manifest: any): Promise<void> {
    return this.runtime.loadPlugin(manifest);
  }

  static getActivePlugins(): string[] {
    return this.runtime.getActivePlugins();
  }
}
