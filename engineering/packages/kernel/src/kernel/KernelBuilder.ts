import { CampusKernel } from './CampusKernel';
import { KernelContext } from './KernelContext';
import { BootSequence } from './BootSequence';

// Runtimes
import { ConfigurationRuntime } from '../runtimes/ConfigurationRuntime';
import { ObservabilityRuntime } from '../runtimes/ObservabilityRuntime';
import { DependencyRuntime } from '../runtimes/DependencyRuntime';
import { ValidationRuntime } from '../runtimes/ValidationRuntime';
import { CapabilityRuntime } from '../runtimes/CapabilityRuntime';
import { SecurityRuntime } from '../runtimes/SecurityRuntime';
import { PluginRuntime } from '../runtimes/PluginRuntime';
import { WorkflowRuntime } from '../runtimes/WorkflowRuntime';
import { CertificationRuntime } from '../runtimes/CertificationRuntime';
import { LifecycleRuntime } from '../runtimes/LifecycleRuntime';
import { KernelRuntime } from '../runtimes/KernelRuntime';

export class KernelBuilder {
  static createDefaultKernel(): CampusKernel {
    const context = new KernelContext();

    // Register all runtimes
    context.registerRuntime('ConfigurationRuntime', new ConfigurationRuntime());
    context.registerRuntime('ObservabilityRuntime', new ObservabilityRuntime());
    context.registerRuntime('DependencyRuntime', new DependencyRuntime());
    context.registerRuntime('ValidationRuntime', new ValidationRuntime());
    context.registerRuntime('CapabilityRuntime', new CapabilityRuntime());
    context.registerRuntime('SecurityRuntime', new SecurityRuntime());
    context.registerRuntime('PluginRuntime', new PluginRuntime());
    context.registerRuntime('WorkflowRuntime', new WorkflowRuntime());
    context.registerRuntime('CertificationRuntime', new CertificationRuntime());
    context.registerRuntime('LifecycleRuntime', new LifecycleRuntime());
    context.registerRuntime('KernelRuntime', new KernelRuntime());

    // Define strict boot order
    const sequence = new BootSequence([
      'ConfigurationRuntime',
      'ObservabilityRuntime',
      'DependencyRuntime',
      'ValidationRuntime',
      'CapabilityRuntime',
      'SecurityRuntime',
      'PluginRuntime',
      'WorkflowRuntime',
      'CertificationRuntime',
      'LifecycleRuntime',
      'KernelRuntime'
    ]);

    return new CampusKernel(context, sequence);
  }
}
