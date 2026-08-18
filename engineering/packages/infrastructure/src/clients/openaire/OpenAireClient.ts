import { VendorClientBase } from '../VendorClientBase';
import { CanonicalMetadataModel } from '@campus-os/application-core/src/contracts/infrastructure/metadata/CanonicalMetadataModel';

export class OpenAireClient extends VendorClientBase {
  constructor(apiKey: string) {
    super('https://api.openaire.eu', apiKey);
  }

  public async pushMetadata(metadataXml: string): Promise<void> {
    await this.request('/harvest', { method: 'POST', body: metadataXml });
  }

  public async getHarvestStatus(publicationId: string): Promise<string> {
    const res = await this.request<{ status: string }>(`/status/${publicationId}`, { method: 'GET' });
    return res.status;
  }
}
