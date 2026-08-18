export class RegistryTransaction {
  private tempState = new Map<string, any>();

  begin() {
    this.tempState.clear();
  }

  register(key: string, value: any) {
    this.tempState.set(key, value);
  }

  validate(): boolean {
    return true;
  }

  commit(targetMap: Map<string, any>) {
    for (const [k, v] of this.tempState.entries()) {
      targetMap.set(k, v);
    }
    this.tempState.clear();
  }

  rollback() {
    this.tempState.clear();
  }
}

export class PresentationRegistry {
  private pages = new Map<string, any>();
  private widgets = new Map<string, any>();
  private isFrozen = false;

  createTransaction(): RegistryTransaction {
    if (this.isFrozen) throw new Error("Registry is frozen");
    return new RegistryTransaction();
  }
  
  commitTransaction(tx: RegistryTransaction) {
    if (this.isFrozen) throw new Error("Registry is frozen");
  }

  freeze(): Readonly<PresentationRegistry> {
    this.isFrozen = true;
    return this;
  }
}
