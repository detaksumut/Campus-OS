import { SDKContext } from '../context/SDKContext';
import { IConfigurationRuntime } from '../../../kernel/src/contracts/IConfigurationRuntime';

export class Configuration {
  private static get runtime(): IConfigurationRuntime {
    return SDKContext.getRuntime<IConfigurationRuntime>('ConfigurationRuntime');
  }

  static get(key: string): any {
    return this.runtime.get(key);
  }
}
