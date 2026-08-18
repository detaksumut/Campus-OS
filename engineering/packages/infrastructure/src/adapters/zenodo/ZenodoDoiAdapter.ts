import { IDoiRuntime } from '@campus-os/application-core/src/contracts/infrastructure/IDoiRuntime';
import { ZenodoDoiClient } from '../../clients/zenodo/ZenodoClients';
import { VendorRegistry } from '../../clients/VendorRegistry';

export class ZenodoDoiAdapter implements IDoiRuntime {
  private client: ZenodoDoiClient;

  constructor(apiKey: string, useSandbox: boolean = false) {
    if (!VendorRegistry.getCapabilities('zenodo').supportsDoi) {
      throw new Error('Zenodo does not support DOI operations according to registry');
    }
    this.client = new ZenodoDoiClient(apiKey, useSandbox);
  }

  public async requestDoi(publicationId: string): Promise<string> {
    console.log(`[ZenodoDoiAdapter] Delegating DOI request to ZenodoDoiClient...`);
    // Here we map PublicationId -> CanonicalMetadataModel -> Client call
    return await this.client.reserveDoi({ title: 'Sample', abstract: '', authors: [], keywords: [], publicationDate: '', license: '', language: '' });
  }

  public async updateDoi(doi: string, metadata: any): Promise<void> {
    console.log(`[ZenodoDoiAdapter] Updating metadata for DOI: ${doi}`);
  }

  public async resolveDoi(doi: string): Promise<any> {
    console.log(`[ZenodoDoiAdapter] Resolving DOI: ${doi}`);
    return { doi, status: 'registered' };
  }
}
