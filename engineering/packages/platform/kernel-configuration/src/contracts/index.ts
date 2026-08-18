export interface UpdateConfigurationCommand {
  key: string;
  value: any;
  updatedBy: string;
}

export interface GetConfigurationQuery {
  key: string;
}

export interface ConfigurationDto {
  key: string;
  value: any;
  version: number;
  lastUpdatedAt: Date;
  lastUpdatedBy: string;
}

export interface IConfigurationRepository {
  get(key: string): Promise<ConfigurationDto | null>;
  save(config: ConfigurationDto): Promise<void>;
}
