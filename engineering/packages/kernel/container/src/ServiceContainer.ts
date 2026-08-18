export type Lifetime = 'Singleton' | 'Transient' | 'Scoped';

export interface ServiceDescriptor<T = any> {
  token: string;
  lifetime: Lifetime;
  factory: (container: IServiceContainer) => T;
  instance?: T;
}

export interface IServiceContainer {
  register<T>(token: string, lifetime: Lifetime, factory: (container: IServiceContainer) => T): void;
  resolve<T>(token: string): T;
  createScope(): IServiceContainer;
  disposeScope(): void;
}

export class ServiceContainer implements IServiceContainer {
  private services = new Map<string, ServiceDescriptor>();
  private scopedInstances = new Map<string, any>();
  
  constructor(private parent?: ServiceContainer) {}

  register<T>(token: string, lifetime: Lifetime, factory: (container: IServiceContainer) => T): void {
    if (this.parent) {
      throw new Error("Cannot register services on a child scope. Register on the root container.");
    }
    this.services.set(token, { token, lifetime, factory });
  }

  resolve<T>(token: string): T {
    const descriptor = this.parent ? this.parent.services.get(token) : this.services.get(token);
    
    if (!descriptor) {
      throw new Error(`Service [${token}] not found in container.`);
    }

    switch (descriptor.lifetime) {
      case 'Singleton':
        if (!descriptor.instance) {
          descriptor.instance = descriptor.factory(this.parent || this);
        }
        return descriptor.instance;
        
      case 'Transient':
        return descriptor.factory(this);
        
      case 'Scoped':
        if (!this.parent) {
          throw new Error(`Cannot resolve scoped service [${token}] from the root container. Create a scope first.`);
        }
        if (!this.scopedInstances.has(token)) {
          this.scopedInstances.set(token, descriptor.factory(this));
        }
        return this.scopedInstances.get(token);
    }
  }

  createScope(): IServiceContainer {
    if (this.parent) {
      throw new Error("Cannot create a scope from an existing scope.");
    }
    return new ServiceContainer(this);
  }

  disposeScope(): void {
    if (!this.parent) {
      throw new Error("Cannot dispose the root container scope.");
    }
    this.scopedInstances.clear();
  }
}
