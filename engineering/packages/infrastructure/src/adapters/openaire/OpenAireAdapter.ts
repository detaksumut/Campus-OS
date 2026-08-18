import { IIndexingRuntime } from '@campus-os/application-core/src/contracts/infrastructure/IIndexingRuntime';

export class OpenAireAdapter implements IIndexingRuntime {
  public async harvestMetadata(publicationId: string): Promise<void> {
    console.log(`[OpenAireAdapter] Initiating metadata harvest for ${publicationId}`);
    return Promise.resolve();
  }

  public async checkStatus(publicationId: string): Promise<'PENDING' | 'HARVESTED' | 'FAILED'> {
    console.log(`[OpenAireAdapter] Checking harvest status for ${publicationId}`);
    return Promise.resolve('PENDING');
  }

  public async submitForAccreditation(journalId: string, payload: any): Promise<void> {
    // OpenAIRE doesn't do national accreditation, this might be a no-op or throw Unsupported
    throw new Error('Method not supported by OpenAIRE. Use ArjunaAdapter for accreditation.');
  }
}
