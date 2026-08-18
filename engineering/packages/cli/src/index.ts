#!/usr/bin/env node

import { Command } from 'commander';
import { compileArchitecture } from '../../../tools/architecture-compiler/src/index';
import { DomainGenerator } from './generators/DomainGenerator';

const program = new Command();

program
  .name('campus')
  .description('Campus OS Developer Platform CLI')
  .version('1.0.0');

// Architecture Commands
program
  .command('architecture compile')
  .description('Compile Blueprints into Intermediate Architecture Model (IAM) and Templates')
  .action(() => {
    try {
      compileArchitecture();
    } catch (err) {
      console.error('Architecture Compilation Failed:', err);
      process.exit(1);
    }
  });

// Doctor Command
program
  .command('doctor [target]')
  .description('Run platform diagnostics (e.g. campus doctor sdk)')
  .action((target?: string) => {
    // Dynamic import to avoid heavy loads if not running doctor
    const { executeDoctor } = require('./commands/doctor');
    executeDoctor(target);
  });

// Simulate Command
program
  .command('simulate workflow <workflowName>')
  .description('Simulate a workflow in the Runtime Simulator')
  .requiredOption('--scenario <file>', 'JSON scenario file to inject')
  .action((workflowName: string, options: any) => {
    const { executeSimulator } = require('./commands/simulate');
    executeSimulator(workflowName, options.scenario);
  });

// Certify Command
program
  .command('certify <target>')
  .description('Certify a platform component or domain')
  .action((target: string) => {
    const { executeCertify } = require('./commands/certify');
    executeCertify(target);
  });

// Generator Commands
const newCommand = program.command('new').description('Generate a new Campus OS asset');

newCommand
  .command('domain <name>')
  .description('Generate a new Bounded Context domain')
  .action((name: string) => {
    console.log(`[Campus CLI] Generating Domain: ${name}`);
    try {
      DomainGenerator.generate(name);
    } catch (err) {
      console.error('Domain generation failed:', err);
      process.exit(1);
    }
  });

newCommand
  .command('service <name>')
  .description('Generate a new Shared Service')
  .action((name: string) => {
    console.log(`[Campus CLI] Generating Service: ${name}`);
    try {
      const { ServiceGenerator } = require('./generators/ServiceGenerator');
      ServiceGenerator.generate(name);
    } catch (err) {
      console.error('Service generation failed:', err);
      process.exit(1);
    }
  });

program.parse(process.argv);
