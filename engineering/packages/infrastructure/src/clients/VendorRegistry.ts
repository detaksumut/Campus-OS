export interface VendorCapabilities {
  supportsDoi: boolean;
  supportsRepository: boolean;
  supportsHarvesting: boolean;
  supportsValidation: boolean;
  supportsSubmission: boolean;
  supportsMonitoring: boolean;
}

export class VendorRegistry {
  private static vendors: Record<string, VendorCapabilities> = {
    'zenodo': {
      supportsDoi: true,
      supportsRepository: true,
      supportsHarvesting: false,
      supportsValidation: false,
      supportsSubmission: false,
      supportsMonitoring: false,
    },
    'openaire': {
      supportsDoi: false,
      supportsRepository: false,
      supportsHarvesting: true,
      supportsValidation: true,
      supportsSubmission: false,
      supportsMonitoring: false,
    },
    'arjuna': {
      supportsDoi: false,
      supportsRepository: false,
      supportsHarvesting: false,
      supportsValidation: false,
      supportsSubmission: true,
      supportsMonitoring: true,
    }
  };

  public static getCapabilities(vendorId: string): VendorCapabilities {
    const caps = this.vendors[vendorId.toLowerCase()];
    if (!caps) throw new Error(`Vendor ${vendorId} not found in Registry`);
    return caps;
  }
}
