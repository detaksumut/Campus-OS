import * as fs from 'fs';
import * as path from 'path';

export async function generate(args: string[]) {
  const [type, name] = args;
  if (!type || !name) {
    console.error('Usage: campus generate <domain|runtime|package|adr> <name>');
    return;
  }

  const root = path.resolve(process.cwd());

  if (type === 'domain') {
    const domainDir = path.join(root, 'packages/domains', name);
    fs.mkdirSync(domainDir, { recursive: true });
    // Boilerplate generation logic here (Contracts, SDK, Runtime, Registry, UI, Tests)
    console.log(`✅ Generated Domain: ${name} at packages/domains/${name}`);
  } else if (type === 'runtime') {
    const runtimeDir = path.join(root, 'packages/platform', `${name}-runtime`);
    fs.mkdirSync(runtimeDir, { recursive: true });
    console.log(`✅ Generated Platform Runtime: ${name} at packages/platform/${name}-runtime`);
  } else if (type === 'adr') {
    const adrDir = path.join(root, '../../docs/adr');
    fs.mkdirSync(adrDir, { recursive: true });
    const adrFile = path.join(adrDir, `ADR-${name}.md`);
    fs.writeFileSync(adrFile, `# Architecture Decision: ${name}\n\n## Context\n\n## Decision\n\n## Consequences\n`);
    console.log(`✅ Generated ADR: ${name}`);
  } else {
    console.error(`Unknown generator type: ${type}`);
  }
}
