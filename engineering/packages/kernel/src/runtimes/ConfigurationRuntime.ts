import { BaseRuntime } from './BaseRuntime';
import { IConfigurationRuntime } from '../contracts/IConfigurationRuntime';

export class ConfigurationRuntime extends BaseRuntime implements IConfigurationRuntime {
  constructor() {
    super('ConfigurationRuntime');
  }

  get(key: string): any {
    return process.env[key] || null;
  }

  async loadEnvironment(): Promise<void> {
    console.log(`[${this.name}] Environment loaded.`);
  }
}
