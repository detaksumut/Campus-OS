import { PresentationPlugin } from '../contracts/PresentationPlugin';

export interface CompatibilityResult {
  valid: boolean;
  errors: string[];
}

export class CompatibilityVerifier {
  private static readonly ACTIVE_ABI_VERSION = 'v1.0';
  private static readonly KERNEL_VERSION = 'v2.1.0';

  static verifyPlugin(plugin: PresentationPlugin, targetAbiVersion: string): CompatibilityResult {
    const errors: string[] = [];

    // Verify ABI Version (Simulated via targetAbiVersion for now)
    if (targetAbiVersion !== this.ACTIVE_ABI_VERSION) {
      errors.push(`ABI Version mismatch. Expected ${this.ACTIVE_ABI_VERSION}, got ${targetAbiVersion}`);
    }

    // Verify Plugin Structure
    if (!plugin.id || !plugin.version) {
      errors.push('Plugin is missing critical identifiers (id, version)');
    }

    // Verify Action Descriptors
    plugin.actions.forEach(action => {
      if (!action.id || !action.category || action.idempotent === undefined || !action.retryPolicy) {
        errors.push(`Action ${action.id} is not fully compatible with Presentation Kernel ABI`);
      }
    });

    // Verify Widget Descriptors
    plugin.widgets.forEach(widget => {
      if (!widget.id || !widget.zone || widget.lazy === undefined || !widget.priority) {
        errors.push(`Widget ${widget.id} is not fully compatible with Presentation Kernel ABI`);
      }
    });

    // Verify Workbench Descriptors
    plugin.workbenches.forEach(workbench => {
      workbench.zones.forEach(zone => {
        if (!['Navigation', 'Sidebar', 'Content', 'Inspector', 'Footer', 'Overlay', 'Dialog'].includes(zone.type)) {
          errors.push(`Workbench ${workbench.id} declares invalid zone type: ${zone.type}`);
        }
      });
    });

    return {
      valid: errors.length === 0,
      errors
    };
  }
}
