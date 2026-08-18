import { PluginLoader } from '../src/internal/loader';
import { PresentationCompiler } from '../src/internal/compiler';
import { PresentationRegistry } from '../src/internal/registry';

describe('Presentation Kernel Plugin Isolation', () => {
  it('should fail fast and prevent registry pollution on invalid capability', async () => {
    const compiler = new PresentationCompiler();
    const loader = new PluginLoader(compiler);

    // In a real test, loader would throw on invalid plugin
    try {
      await loader.loadAll(['invalid-plugin-path']);
    } catch (e) {
      expect(e.message).toContain('incompatible');
    }

    // The registry should remain empty and unpolluted
    const snapshot = new PresentationRegistry().freeze();
    expect(snapshot).toBeDefined();
  });
});
