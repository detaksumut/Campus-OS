export class IdentityId {
  constructor(private readonly id: string) {
    if (!id || id.trim() === '') {
      throw new Error('Identity ID cannot be empty.');
    }
    this.id = id.trim();
  }

  getValue(): string {
    return this.id;
  }

  equals(other: IdentityId): boolean {
    return this.id === other.getValue();
  }
}
