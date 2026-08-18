#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');

program
  .version('1.0.0')
  .description('Campus OS Development CLI');

program
  .command('generate module <name>')
  .description('Generate a new Campus OS module')
  .action(async (name) => {
    const moduleName = name.toLowerCase();
    console.log(`Generating Campus OS Module: ${moduleName}...`);

    // We generate inside packages/domains by default
    const targetDir = path.join(process.cwd(), 'packages', 'domains', moduleName);

    if (fs.existsSync(targetDir)) {
      console.error(`Error: Module ${moduleName} already exists at ${targetDir}`);
      process.exit(1);
    }

    // Scaffolding directories
    const dirs = [
      'src',
      'src/widgets',
      'src/services',
      'src/permissions',
      'src/capabilities',
      'src/projections',
      'src/commands',
      'src/submodules'
    ];

    dirs.forEach(dir => fs.mkdirSync(path.join(targetDir, dir), { recursive: true }));

    // manifest.ts
    const manifestContent = `
import { ModuleManifest } from '@campus-os/presentation-core';
import { ${moduleName}Routes } from './routes';
import { ${moduleName}Workbenches } from './workbench';

export const ${moduleName}Manifest: ModuleManifest = {
  id: 'module.${moduleName}',
  name: '${name.charAt(0).toUpperCase() + name.slice(1)} Module',
  navigation: ${moduleName}Routes,
  workbenches: ${moduleName}Workbenches,
  widgets: [],
  capabilities: [],
  permissions: []
};
`;
    fs.writeFileSync(path.join(targetDir, 'src', 'manifest.ts'), manifestContent.trim());

    // routes.ts
    const routesContent = `
export const ${moduleName}Routes = [
  {
    id: 'nav.${moduleName}',
    label: '${name.charAt(0).toUpperCase() + name.slice(1)}',
    route: '/${moduleName}',
    moduleId: 'module.${moduleName}',
    workbenchId: '${moduleName}-dashboard'
  }
];
`;
    fs.writeFileSync(path.join(targetDir, 'src', 'routes.ts'), routesContent.trim());

    // workbench.ts
    const workbenchContent = `
export const ${moduleName}Workbenches = [
  {
    id: '${moduleName}-dashboard',
    name: '${name.charAt(0).toUpperCase() + name.slice(1)} Dashboard',
    defaultLayout: 'layout.dashboard.standard'
  }
];
`;
    fs.writeFileSync(path.join(targetDir, 'src', 'workbench.ts'), workbenchContent.trim());

    // index.ts
    fs.writeFileSync(path.join(targetDir, 'src', 'index.ts'), `export * from './manifest';\n`);

    // package.json for the module
    const pkgContent = {
      name: `@campus-os/${moduleName}`,
      version: "1.0.0",
      main: "src/index.ts",
      dependencies: {
        "@campus-os/presentation-core": "^1.0.0"
      }
    };
    fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(pkgContent, null, 2));

    console.log(`\n✅ Module ${moduleName} generated successfully at:`);
    console.log(`   ${targetDir}`);
    console.log(`\nNext steps:`);
    console.log(`1. Add widgets in src/widgets/`);
    console.log(`2. Register them in src/manifest.ts`);
    console.log(`3. Run \`npm install\` to link the new workspace`);
  });

program.parse(process.argv);
