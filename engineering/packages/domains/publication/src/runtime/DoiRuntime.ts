import { IDoiRuntime, DoiRecord, DoiLifecycle } from '../contracts';
import { IEventBus } from '@campus-os/kernel';

export class DoiRuntime implements IDoiRuntime {
  private records = new Map<string, DoiRecord>();
  private byPublication = new Map<string, string>();

  private transitions: Record<DoiLifecycle, DoiLifecycle[]> = {
    'Requested':       ['Registered'],
    'Registered':      ['Verified'],
    'Verified':        ['Metadata Updated'],
    'Metadata Updated':['Metadata Updated'] // Idempotent - can be updated multiple times
  };

  constructor(private eventBus: IEventBus) {}

  async requestDoi(publicationId: string, provider: string): Promise<string> {
    const doiId = `doi_${Date.now()}`;
    const record: DoiRecord = {
      doiId, doi: '', publicationId, state: 'Requested',
      requestedAt: Date.now(), provider
    };
    this.records.set(doiId, record);
    this.byPublication.set(publicationId, doiId);
    return doiId;
  }

  private getOrThrow(doiId: string): DoiRecord {
    const r = this.records.get(doiId);
    if (!r) throw new Error('DOI record not found');
    return r;
  }

  async registerDoi(doiId: string, doi: string): Promise<void> {
    const r = this.getOrThrow(doiId);
    if (!this.transitions[r.state].includes('Registered')) {
      throw new Error(`Cannot register from state: ${r.state}`);
    }
    r.doi = doi;
    r.state = 'Registered';
    r.registeredAt = Date.now();
    this.eventBus.emit('publication.doi.registered', { doiId, doi, publicationId: r.publicationId });
  }

  async verifyDoi(doiId: string): Promise<void> {
    const r = this.getOrThrow(doiId);
    if (r.state !== 'Registered') throw new Error('DOI must be Registered before Verification');
    r.state = 'Verified';
    r.verifiedAt = Date.now();
  }

  async updateMetadata(doiId: string): Promise<void> {
    const r = this.getOrThrow(doiId);
    if (r.state !== 'Verified' && r.state !== 'Metadata Updated') {
      throw new Error('Metadata can only be updated after DOI is Verified');
    }
    r.state = 'Metadata Updated';
    r.lastMetadataUpdateAt = Date.now();
    this.eventBus.emit('publication.doi.metadata-updated', { doiId, publicationId: r.publicationId });
  }

  async getRecord(doiId: string): Promise<DoiRecord | null> {
    return this.records.get(doiId) || null;
  }

  async getByPublication(publicationId: string): Promise<DoiRecord | null> {
    const doiId = this.byPublication.get(publicationId);
    return doiId ? this.getRecord(doiId) : null;
  }
}
