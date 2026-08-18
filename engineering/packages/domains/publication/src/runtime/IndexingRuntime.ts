import { IIndexingRuntime, IndexingRecord } from '../contracts';
import { IEventBus } from '@campus-os/kernel';

// External Indexing Adapter Interface
export interface IIndexingAdapter {
  adapterId: string;
  name: string;
  submit(metadata: Record<string, unknown>): Promise<void>;
}

// Concrete Adapters (stubs for external integration)
export class CrossrefAdapter implements IIndexingAdapter {
  readonly adapterId = 'crossref';
  readonly name = 'Crossref';
  async submit(metadata: Record<string, unknown>): Promise<void> { /* External API call */ }
}

export class DOAJAdapter implements IIndexingAdapter {
  readonly adapterId = 'doaj';
  readonly name = 'Directory of Open Access Journals';
  async submit(metadata: Record<string, unknown>): Promise<void> { /* External API call */ }
}

export class OpenAlexAdapter implements IIndexingAdapter {
  readonly adapterId = 'openalex';
  readonly name = 'OpenAlex';
  async submit(metadata: Record<string, unknown>): Promise<void> { /* External API call */ }
}

export class GarudaAdapter implements IIndexingAdapter {
  readonly adapterId = 'garuda';
  readonly name = 'Garuda (Indonesia)';
  async submit(metadata: Record<string, unknown>): Promise<void> { /* External API call */ }
}

export class DimensionsAdapter implements IIndexingAdapter {
  readonly adapterId = 'dimensions';
  readonly name = 'Dimensions';
  async submit(metadata: Record<string, unknown>): Promise<void> { /* External API call */ }
}

export class IndexingRuntime implements IIndexingRuntime {
  private records = new Map<string, IndexingRecord>();
  private internalIndex = new Map<string, Record<string, unknown>>();

  private adapters: Map<string, IIndexingAdapter>;

  constructor(
    adapters: IIndexingAdapter[],
    private eventBus: IEventBus
  ) {
    this.adapters = new Map(adapters.map(a => [a.adapterId, a]));
  }

  async indexInternally(publicationId: string): Promise<void> {
    // Store in internal search index (simplified)
    this.internalIndex.set(publicationId, { publicationId, indexedAt: Date.now() });

    const existing = this.records.get(publicationId) || {
      indexingId: `idx_${publicationId}`, publicationId,
      internalIndexed: false, externalTargets: [], indexedAt: Date.now()
    };
    existing.internalIndexed = true;
    this.records.set(publicationId, existing);

    this.eventBus.emit('publication.indexing.internal', { publicationId });
  }

  async indexExternally(publicationId: string, adapterIds: string[]): Promise<void> {
    const metadata = this.internalIndex.get(publicationId) || {};
    const submittedTargets: { adapterId: string; name: string }[] = [];

    for (const adapterId of adapterIds) {
      const adapter = this.adapters.get(adapterId);
      if (!adapter) throw new Error(`Unknown indexing adapter: ${adapterId}`);
      await adapter.submit(metadata);
      submittedTargets.push({ adapterId: adapter.adapterId, name: adapter.name });
    }

    const existing = this.records.get(publicationId) || {
      indexingId: `idx_${publicationId}`, publicationId,
      internalIndexed: false, externalTargets: [], indexedAt: Date.now()
    };
    existing.externalTargets = [...existing.externalTargets, ...submittedTargets];
    this.records.set(publicationId, existing);

    this.eventBus.emit('publication.indexing.external', { publicationId, adapters: adapterIds });
  }

  async getRecord(publicationId: string): Promise<IndexingRecord | null> {
    return this.records.get(publicationId) || null;
  }
}
