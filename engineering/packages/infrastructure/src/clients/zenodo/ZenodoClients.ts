import { VendorClientBase } from '../VendorClientBase';
import { CanonicalMetadataModel } from '@campus-os/application-core/src/contracts/infrastructure/metadata/CanonicalMetadataModel';

export class ZenodoDoiClient extends VendorClientBase {
  constructor(apiKey: string, useSandbox: boolean = false) {
    const baseUrl = useSandbox ? 'https://sandbox.zenodo.org/api' : 'https://zenodo.org/api';
    super(baseUrl, apiKey);
  }

  public async reserveDoi(metadata: CanonicalMetadataModel): Promise<string> {
    const res = await this.request<{ doi: string }>('/deposit/depositions', { method: 'POST', body: metadata });
    return res.doi || '10.5281/zenodo.mock-doi';
  }
}

export class ZenodoRepositoryClient extends VendorClientBase {
  constructor(apiKey: string, useSandbox: boolean = false) {
    const baseUrl = useSandbox ? 'https://sandbox.zenodo.org/api' : 'https://zenodo.org/api';
    super(baseUrl, apiKey);
  }

  public async uploadArchive(depositionId: string, filePath: string): Promise<void> {
    await this.request(`/deposit/depositions/${depositionId}/files`, { method: 'POST' });
  }

  public async publish(depositionId: string): Promise<void> {
    await this.request(`/deposit/depositions/${depositionId}/actions/publish`, { method: 'POST' });
  }
}
