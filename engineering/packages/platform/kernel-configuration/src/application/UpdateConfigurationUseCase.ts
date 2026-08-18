import { UpdateConfigurationCommand, IConfigurationRepository } from '../contracts';
import { ConfigurationEntry } from '../domain/ConfigurationEntry';

export class UpdateConfigurationUseCase {
  constructor(private repository: IConfigurationRepository) {}

  async execute(command: UpdateConfigurationCommand): Promise<void> {
    let dto = await this.repository.get(command.key);
    let entry: ConfigurationEntry;

    if (dto) {
      entry = new ConfigurationEntry(
        dto.key,
        dto.value,
        dto.version,
        dto.lastUpdatedAt,
        dto.lastUpdatedBy
      );
      entry.updateValue(command.value, command.updatedBy);
    } else {
      entry = new ConfigurationEntry(
        command.key,
        command.value,
        1,
        new Date(),
        command.updatedBy
      );
    }

    await this.repository.save({
      key: entry.key,
      value: entry.getValue(),
      version: entry.getVersion(),
      lastUpdatedAt: new Date(),
      lastUpdatedBy: command.updatedBy
    });
  }
}
