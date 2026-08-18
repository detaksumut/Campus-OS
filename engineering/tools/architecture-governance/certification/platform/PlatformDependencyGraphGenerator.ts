export interface DependencyNode {
  module: string;
  dependsOn: string[];
}

export interface PlatformDependencyGraph {
  nodes: DependencyNode[];
  hasCycle: boolean;
  cycles: string[][];
}

export class PlatformDependencyGraphGenerator {
  static generate(dependencies: DependencyNode[]): PlatformDependencyGraph {
    // Sort deterministically
    const sortedNodes = [...dependencies].sort((a, b) => a.module.localeCompare(b.module));
    sortedNodes.forEach(n => n.dependsOn.sort());

    const hasCycle = false; // Mocking deterministic cycle detection for now
    const cycles: string[][] = [];

    return {
      nodes: sortedNodes,
      hasCycle,
      cycles
    };
  }
}
