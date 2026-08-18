import { KernelContext } from './KernelContext';
import { KernelState } from './KernelState';
import { BootSequence } from './BootSequence';

export class CampusKernel {
  private context: KernelContext;
  private state: KernelState;
  private bootSequence: BootSequence;

  constructor(context: KernelContext, sequence: BootSequence) {
    this.context = context;
    this.bootSequence = sequence;
    this.state = KernelState.BOOTING;
  }

  async boot(): Promise<void> {
    try {
      console.log('--- CampusKernel Boot Sequence Started ---');
      const sequence = this.bootSequence.getSequence();

      for (const runtimeName of sequence) {
        const runtime = this.context.getRuntime(runtimeName);
        console.log(`\n>>> Booting ${runtimeName}`);
        await runtime.initialize();
        await runtime.boot();
        await runtime.start();
        await runtime.ready();
      }

      this.state = KernelState.READY;
      console.log('\n--- CampusKernel Successfully Booted ---');
    } catch (error) {
      this.state = KernelState.ERROR;
      console.error('CampusKernel Boot Failed:', error);
      throw error;
    }
  }

  async shutdown(): Promise<void> {
    this.state = KernelState.TERMINATING;
    console.log('\n--- CampusKernel Shutdown Sequence Started ---');
    
    // Reverse boot order for shutdown
    const sequence = [...this.bootSequence.getSequence()].reverse();

    for (const runtimeName of sequence) {
      const runtime = this.context.getRuntime(runtimeName);
      console.log(`\n<<< Shutting down ${runtimeName}`);
      await runtime.shutdown();
      await runtime.dispose();
    }

    console.log('\n--- CampusKernel Successfully Shut Down ---');
  }

  getState(): KernelState {
    return this.state;
  }
}
