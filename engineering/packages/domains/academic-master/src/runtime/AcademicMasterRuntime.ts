import { IAcademicMasterCapability } from '../contracts/capabilities/IAcademicMasterCapability';
import { AcademicMasterCapabilityRegistry } from './AcademicMasterCapabilityRegistry';

export class AcademicMasterRuntime {
  private static instance: AcademicMasterRuntime;
  public readonly registry: AcademicMasterCapabilityRegistry;

  private constructor() {
    this.registry = new AcademicMasterCapabilityRegistry();
  }

  public static getInstance(): AcademicMasterRuntime {
    if (!AcademicMasterRuntime.instance) {
      AcademicMasterRuntime.instance = new AcademicMasterRuntime();
    }
    return AcademicMasterRuntime.instance;
  }

  public getCapability(): IAcademicMasterCapability {
    return this.registry.getProvidedCapability();
  }
}
