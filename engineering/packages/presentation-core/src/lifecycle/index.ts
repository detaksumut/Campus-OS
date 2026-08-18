export abstract class PresentationPluginLifecycle {
  // Build Lifecycle
  abstract discover(): void;
  abstract load(): void;
  abstract compile(): void;
  abstract link(): void;
  abstract cache(): void;

  // Runtime Lifecycle
  abstract restore(): void;
  abstract initialize(): void;
  abstract activate(): void;
  abstract deactivate(): void;
  abstract dispose(): void;
}
