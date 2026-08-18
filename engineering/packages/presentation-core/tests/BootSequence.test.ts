import { PresentationBootloader } from '../src/internal/bootloader';

describe('Presentation Kernel Boot Sequence', () => {
  it('should execute Full Compiler Pipeline on Cold Boot (Production)', async () => {
    const bootloader = new PresentationBootloader({ mode: 'production', pluginPaths: ['valid-plugin'] });
    // Mock checkCache to return false
    (bootloader as any).checkCache = () => false;
    
    const spy = jest.spyOn((bootloader as any).compiler, 'compile');
    await bootloader.boot();
    
    expect(spy).toHaveBeenCalled();
  });

  it('should skip Compiler Pipeline and restore from Cache on Warm Boot', async () => {
    const bootloader = new PresentationBootloader({ mode: 'production', pluginPaths: ['valid-plugin'] });
    // Mock checkCache to return true
    (bootloader as any).checkCache = () => true;
    
    const spy = jest.spyOn((bootloader as any).compiler, 'compile');
    await bootloader.boot();
    
    expect(spy).not.toHaveBeenCalled();
  });
});
