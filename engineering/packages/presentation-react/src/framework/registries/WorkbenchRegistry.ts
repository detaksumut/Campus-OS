export interface WorkbenchDefinition {
  id: string;
  name: string;
  description?: string;
  defaultLayout: string;
}

export class WorkbenchRegistry {
  private workbenches = new Map<string, WorkbenchDefinition>();

  public register(workbench: WorkbenchDefinition): void {
    if (this.workbenches.has(workbench.id)) {
      throw new Error(`Workbench with ID ${workbench.id} is already registered.`);
    }
    this.workbenches.set(workbench.id, workbench);
  }

  public get(id: string): WorkbenchDefinition | undefined {
    return this.workbenches.get(id);
  }

  public getAll(): WorkbenchDefinition[] {
    return Array.from(this.workbenches.values());
  }
}

export const globalWorkbenchRegistry = new WorkbenchRegistry();
