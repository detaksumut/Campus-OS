export interface IRuntime {
  /**
   * Initializes the runtime with necessary dependencies.
   */
  initialize(): Promise<void>;

  /**
   * Prepares the runtime to boot, loading configurations or checking prerequisites.
   */
  boot(): Promise<void>;

  /**
   * Starts the runtime, actively beginning its processes.
   */
  start(): Promise<void>;

  /**
   * Called when the runtime is fully operational and ready to accept traffic or requests.
   */
  ready(): Promise<void>;

  /**
   * Gracefully shuts down the runtime, rejecting new requests but finishing active ones.
   */
  shutdown(): Promise<void>;

  /**
   * Completely disposes of resources, connections, and memory bindings.
   */
  dispose(): Promise<void>;
}
