export interface EnterpriseReleaseMetadata {
  enterpriseVersion: string;
  buildIdentifier: string;
  certificationVersion: string;
  releaseDate: string;
  compatibleKernelVersions: string[];
  compatibleGovernanceVersion: string;
  releaseNotesReference: string;
}

export class EnterpriseReleaseMetadataGenerator {
  static generate(metadata: Omit<EnterpriseReleaseMetadata, 'releaseDate'>): EnterpriseReleaseMetadata {
    return {
      ...metadata,
      releaseDate: new Date().toISOString()
    };
  }
}
