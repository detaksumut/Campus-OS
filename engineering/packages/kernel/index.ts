import { KernelBuilder } from './src/kernel/KernelBuilder';

async function bootstrap() {
  const kernel = KernelBuilder.createDefaultKernel();
  
  try {
    await kernel.boot();
    console.log('SYSTEM IS OPERATIONAL');
    
    // Simulate runtime
    setTimeout(async () => {
      await kernel.shutdown();
    }, 2000);
  } catch (err) {
    console.error('SYSTEM PANIC', err);
    process.exit(1);
  }
}

bootstrap();
