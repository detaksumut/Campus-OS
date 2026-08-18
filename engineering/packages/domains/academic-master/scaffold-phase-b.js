const fs = require('fs');
const path = require('path');

const baseDir = path.join('d:', 'Campus OS', 'engineering', 'packages', 'domains', 'academic-master', 'src', 'domain', 'aggregates');

const aggregates = [
  { name: 'Faculty', entities: ['Department'] },
  { name: 'StudyProgram', entities: ['ProgramProfile', 'AccreditationReference'] },
  { name: 'Curriculum', entities: ['CurriculumCourse', 'CurriculumSemester'] },
  { name: 'Course', entities: ['Prerequisite', 'LearningOutcome'] },
  { name: 'AcademicCalendar', entities: ['AcademicSemester', 'AcademicPeriod'] },
  { name: 'Building', entities: ['Room'] },
  { name: 'LecturerMaster', entities: ['AcademicRank', 'Homebase'] },
  { name: 'AcademicReference', entities: ['LearningMethod', 'ClassType', 'AcademicStatus'] }
];

function scaffold() {
  aggregates.forEach(agg => {
    const aggDir = path.join(baseDir, agg.name);
    
    // Create directories
    fs.mkdirSync(aggDir, { recursive: true });
    fs.mkdirSync(path.join(aggDir, 'events'), { recursive: true });
    fs.mkdirSync(path.join(aggDir, 'value-objects'), { recursive: true });
    fs.mkdirSync(path.join(aggDir, 'entities'), { recursive: true });
    
    // Aggregate Root
    fs.writeFileSync(path.join(aggDir, `${agg.name}.ts`), `// Pure Domain Aggregate Root: ${agg.name}
export class ${agg.name} {
  // immutable identity
  public readonly id: string;
  
  protected constructor(id: string) {
    this.id = id;
  }
}
`);

    // Factory
    fs.writeFileSync(path.join(aggDir, `${agg.name}Factory.ts`), `// Factory for ${agg.name}
import { ${agg.name} } from './${agg.name}';

export class ${agg.name}Factory {
  public static create(id: string): ${agg.name} {
    return new ${agg.name}(id); // bypassed protected constructor
  }
}
`);

    // Policy
    fs.writeFileSync(path.join(aggDir, `${agg.name}Policy.ts`), `// Domain Policy for ${agg.name}
export class ${agg.name}Policy {
  public static validateState(): boolean {
    return true;
  }
}
`);

    // Repository Interface
    fs.writeFileSync(path.join(aggDir, `I${agg.name}Repository.ts`), `// Pure Repository Interface
import { ${agg.name} } from './${agg.name}';

export interface I${agg.name}Repository {
  findById(id: string): Promise<${agg.name} | null>;
  save(entity: ${agg.name}): Promise<void>;
}
`);

    // Entities
    agg.entities.forEach(ent => {
      fs.writeFileSync(path.join(aggDir, 'entities', `${ent}.ts`), `// Pure Domain Entity: ${ent}
export class ${ent} {
  public readonly id: string;
  
  protected constructor(id: string) {
    this.id = id;
  }
}
`);
    });
  });

  // Base README
  fs.writeFileSync(path.join(baseDir, '..', 'README.md'), `# Domain Layer - Academic Master Data

## Rules
- 100% Pure Domain (No ORM, No DB, No HTTP)
- Factory instantiation
- Repository Interfaces only
- Rich domain models
`);

  console.log('Scaffolding complete.');
}

scaffold();
