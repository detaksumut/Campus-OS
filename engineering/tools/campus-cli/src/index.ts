import { generate } from './commands/generate';
import { validate } from './commands/validate';
import { doctor } from './commands/doctor';
import { docs } from './commands/docs';
import { certify } from './commands/certify';
import { benchmark } from './commands/benchmark';
import { release } from './commands/release';

const [,, command, ...args] = process.argv;

async function main() {
  switch (command) {
    case 'generate':
      await generate(args);
      break;
    case 'validate':
      await validate(args);
      break;
    case 'doctor':
      await doctor();
      break;
    case 'docs':
      await docs();
      break;
    case 'certify':
      await certify();
      break;
    case 'benchmark':
      await benchmark();
      break;
    case 'release':
      await release();
      break;
    default:
      console.log(`
Usage: campus <command> [args]

Commands:
  generate   Scaffold domains, runtimes, packages, ADRs
  validate   Enforce architecture rules on packages
  doctor     Verify workspace health and dependencies
  docs       Generate platform documentation
  certify    Run runtime and architecture certification
  benchmark  Run performance benchmarks
  release    Generate release artifacts (bump, changelog)
      `);
  }
}

main().catch(console.error);
