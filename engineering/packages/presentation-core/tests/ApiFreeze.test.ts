import * as PublicAPI from '../src/index';

describe('Presentation Kernel API Freeze', () => {
  it('should ONLY export approved public contracts and services', () => {
    const exportedKeys = Object.keys(PublicAPI);
    
    // Assert strictly that internal components are NOT exported
    expect(exportedKeys).not.toContain('PresentationCompiler');
    expect(exportedKeys).not.toContain('PluginLoader');
    expect(exportedKeys).not.toContain('PresentationRegistry');
    
    // Assert that public components ARE exported
    expect(exportedKeys).toContain('definePlugin');
    expect(exportedKeys).toContain('PageService');
  });
});
