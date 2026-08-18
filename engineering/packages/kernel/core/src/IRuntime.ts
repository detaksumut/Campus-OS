export interface IRuntime {
  /**
   * Identifies the runtime
   */
  readonly name: string;

  /**
   * Initial phase: Basic setup, loading default values
   */
  initialize(): Promise<void>;

  /**
   * Configuration phase: Receive settings from configuration provider
   */
  configure(config: any): Promise<void>;

  /**
   * Validation phase: Ensure all prerequisites and dependencies are met
   */
  validate(): Promise<void>;

  /**
   * Start phase: Boot up internal services and listeners
   */
  start(): Promise<void>;

  /**
   * Ready phase: Signal that the runtime is fully operational and ready to serve requests
   */
  ready(): Promise<void>;

  /**
   * Stop phase: Gracefully halt operations, stop accepting new requests
   */
  stop(): Promise<void>;

  /**
   * Dispose phase: Release all resources, close connections, destroy container scopes
   */
  dispose(): Promise<void>;
}
