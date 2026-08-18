import * as fs from 'fs';
import * as path from 'path';

export function generatePlugin(pluginName: string) {
  const baseDir = path.resolve(process.cwd(), `packages/domains/${pluginName}/src/ui`);
  
  const directories = [
    '',
    '/forms',
    '/grids',
    '/widgets',
    '/pages',
    '/tests'
  ];

  directories.forEach(dir => {
    fs.mkdirSync(path.join(baseDir, dir), { recursive: true });
  });

  const manifestTemplate = `import { definePlugin } from '@campus-os/presentation-core';
import { ${pluginName}Routes } from './routes';

export const ${pluginName}Manifest = definePlugin({
  id: 'campus-os-${pluginName.toLowerCase()}',
  version: '1.0.0',
  targetAbi: '1.0',
  capabilities: [],
  routes: ${pluginName}Routes,
  widgets: {},
  forms: {},
  grids: {}
});
`;

  const routesTemplate = `export const ${pluginName}Routes = [];\n`;

  fs.writeFileSync(path.join(baseDir, 'manifest.ts'), manifestTemplate);
  fs.writeFileSync(path.join(baseDir, 'routes.ts'), routesTemplate);

  console.log(`✅ Plugin ${pluginName} generated successfully at ${baseDir}`);
}

// Basic CLI binding if invoked directly
if (process.argv[2] === 'generate' && process.argv[3] === 'plugin') {
  generatePlugin(process.argv[4]);
}
