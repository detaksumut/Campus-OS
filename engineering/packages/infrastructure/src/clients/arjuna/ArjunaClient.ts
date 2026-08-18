import { VendorClientBase } from '../VendorClientBase';

export class ArjunaClient extends VendorClientBase {
  constructor(apiKey: string) {
    super('https://sinta.kemdikbud.go.id/api', apiKey);
  }

  public async submitJournalForAccreditation(journalId: string, metadataJson: string): Promise<void> {
    await this.request(`/accreditation/submit/${journalId}`, { method: 'POST', body: metadataJson });
  }

  public async checkAccreditationStatus(journalId: string): Promise<string> {
    const res = await this.request<{ status: string }>(`/accreditation/status/${journalId}`, { method: 'GET' });
    return res.status;
  }
}
