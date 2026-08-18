export class MemberId {
  constructor(private readonly id: string) {
    if (!id || id.trim() === '') {
      throw new Error('Member ID cannot be empty.');
    }
    this.id = id.trim();
  }

  getValue(): string {
    return this.id;
  }

  equals(other: MemberId): boolean {
    return this.id === other.getValue();
  }
}

export class CardId {
  constructor(private readonly id: string) {
    if (!id || id.trim() === '') {
      throw new Error('Card ID cannot be empty.');
    }
    this.id = id.trim();
  }

  getValue(): string {
    return this.id;
  }

  equals(other: CardId): boolean {
    return this.id === other.getValue();
  }
}
