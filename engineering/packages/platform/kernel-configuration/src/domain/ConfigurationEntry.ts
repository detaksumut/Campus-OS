export class ConfigurationEntry {
  constructor(
    public readonly key: string,
    private value: any,
    private version: number,
    private lastUpdatedAt: Date,
    private lastUpdatedBy: string
  ) {}

  public updateValue(newValue: any, updatedBy: string): void {
    this.value = newValue;
    this.version += 1;
    this.lastUpdatedAt = new Date();
    this.lastUpdatedBy = updatedBy;
  }

  public getValue(): any {
    return this.value;
  }

  public getVersion(): number {
    return this.version;
  }
}
