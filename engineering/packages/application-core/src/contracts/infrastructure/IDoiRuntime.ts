export interface IDoiRuntime {
  requestDoi(publicationId: string): Promise<string>;
  updateDoi(doi: string, metadata: any): Promise<void>;
  resolveDoi(doi: string): Promise<any>;
}
