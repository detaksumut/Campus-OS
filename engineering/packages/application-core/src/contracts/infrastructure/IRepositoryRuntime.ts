export interface IRepositoryRuntime {
  createDeposit(metadata: any): Promise<string>;
  uploadFile(depositId: string, filePath: string, fileBuffer: Buffer): Promise<void>;
  publishDeposit(depositId: string): Promise<void>;
  syncVersion(depositId: string, newMetadata: any): Promise<string>;
}
