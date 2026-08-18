export interface IConfigurationProvider {
  get<T>(key: string): T;
  has(key: string): boolean;
}

export class EnvironmentConfigurationProvider implements IConfigurationProvider {
  get<T>(key: string): T {
    const value = process.env[key];
    if (value === undefined) {
      throw new Error(`Configuration key [${key}] is missing`);
    }
    // Very simple casting for demonstration
    return value as unknown as T;
  }

  has(key: string): boolean {
    return process.env[key] !== undefined;
  }
}
