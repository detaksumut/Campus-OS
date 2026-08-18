export class AccountId {
  constructor(private readonly id: string) {
    if (!id || id.trim() === '') {
      throw new Error('Account ID cannot be empty.');
    }
    this.id = id.trim();
  }

  getValue(): string {
    return this.id;
  }

  equals(other: AccountId): boolean {
    return this.id === other.getValue();
  }
}
