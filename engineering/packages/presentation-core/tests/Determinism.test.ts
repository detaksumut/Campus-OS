import { PresentationCompiler } from '../src/internal/compiler';

describe('Presentation Kernel Determinism', () => {
  it('should generate identical ABI for identical input', () => {
    const compiler = new PresentationCompiler();
    const manifest = { id: 'test-plugin', ui: { pages: ['dashboard'] } };
    
    const output1 = compiler.compile(manifest);
    
    // Simulate a fresh compiler run
    const compiler2 = new PresentationCompiler();
    const output2 = compiler2.compile(manifest);

    // Omit generatedAt timestamp for exact match
    const abi1 = { ...output1.abi, generatedAt: null };
    const abi2 = { ...output2.abi, generatedAt: null };

    expect(abi1).toEqual(abi2);
  });

  it('should generate identical Health Report for identical input', () => {
    const compiler = new PresentationCompiler();
    const output1 = compiler.compile({});
    const output2 = compiler.compile({});
    expect(output1.healthReport).toEqual(output2.healthReport);
  });
});
