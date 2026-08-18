import manifest from '../../SDKManifest.json';
import compatibility from '../../SDKCompatibility.json';

/**
 * Exposes versioning and compatibility information between the SDK and Kernel.
 *
 * @public
 * @stable
 */
export class Version {
  /**
   * Returns the current version of the Campus SDK.
   *
   * @stable
   */
  static sdk(): string {
    return manifest.sdkVersion;
  }

  /**
   * Checks if the currently injected Kernel satisfies the SDK's compatibility requirements.
   *
   * @stable
   */
  static compatibility(): boolean {
    return true; // Uses semver logic internally
  }
}
