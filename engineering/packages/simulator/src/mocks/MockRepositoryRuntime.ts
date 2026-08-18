import { SimulationEvent } from '../contracts/SimulatorContracts';

export class MockRepositoryRuntime {
  private memoryStore: Map<string, any> = new Map();
  private eventLog: SimulationEvent[] = [];

  constructor(initialData: Record<string, any>) {
    Object.keys(initialData).forEach(key => {
      this.memoryStore.set(key, initialData[key]);
    });
  }

  getLog(): SimulationEvent[] {
    return this.eventLog;
  }

  async save(entityId: string, data: any): Promise<void> {
    this.memoryStore.set(entityId, data);
    this.eventLog.push({
      timestamp: new Date().toISOString(),
      component: 'MockRepositoryRuntime',
      action: 'SAVE',
      payload: { entityId }
    });
  }

  async findById(entityId: string): Promise<any> {
    this.eventLog.push({
      timestamp: new Date().toISOString(),
      component: 'MockRepositoryRuntime',
      action: 'FIND',
      payload: { entityId }
    });
    return this.memoryStore.get(entityId);
  }
}
