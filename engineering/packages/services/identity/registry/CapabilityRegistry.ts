import * as fs from 'fs';
import * as path from 'path';

export interface Capability {
  id: string;
  category: string;
  scope: string;
}

export class CapabilityRegistry {
  private capabilities: Map<string, Capability> = new Map();

  constructor() {
    this.loadCapabilities();
  }

  private loadCapabilities() {
    const modelPath = path.resolve(__dirname, '../manifest/CapabilityModel.json');
    if (fs.existsSync(modelPath)) {
      const model = JSON.parse(fs.readFileSync(modelPath, 'utf8'));
      model.capabilities.forEach((cap: Capability) => {
        this.capabilities.set(cap.id, cap);
      });
    }
  }

  isValidCapability(capabilityId: string): boolean {
    return this.capabilities.has(capabilityId);
  }

  getCapability(capabilityId: string): Capability | undefined {
    return this.capabilities.get(capabilityId);
  }
}
