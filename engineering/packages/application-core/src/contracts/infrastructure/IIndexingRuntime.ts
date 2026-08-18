export interface IIndexingRuntime {
  harvestMetadata(publicationId: string): Promise<void>;
  checkStatus(publicationId: string): Promise<'PENDING' | 'HARVESTED' | 'FAILED'>;
  submitForAccreditation(journalId: string, payload: any): Promise<void>;
}
