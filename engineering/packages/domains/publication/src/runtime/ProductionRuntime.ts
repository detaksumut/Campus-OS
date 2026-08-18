import { IProductionRuntime, ProductionRecord, ProductionLifecycle } from '../contracts';
import { IEventBus } from '@campus-os/kernel';

export class ProductionRuntime implements IProductionRuntime {
  private records = new Map<string, ProductionRecord>();

  private transitions: Record<ProductionLifecycle, ProductionLifecycle[]> = {
    'Accepted':                ['Copyediting'],
    'Copyediting':             ['Layout'],
    'Layout':                  ['Proofreading'],
    'Proofreading':            ['Ready For Publication'],
    'Ready For Publication':   ['Publication Approval'],
    'Publication Approval':    ['Scheduled'],
    'Scheduled':               []
  };

  constructor(private eventBus: IEventBus) {}

  async startProduction(submissionId: string, articleId: string): Promise<string> {
    const productionId = `prod_${Date.now()}`;
    this.records.set(productionId, {
      productionId, submissionId, articleId, state: 'Accepted', startedAt: Date.now()
    });
    return productionId;
  }

  private getOrThrow(productionId: string): ProductionRecord {
    const r = this.records.get(productionId);
    if (!r) throw new Error('Production record not found');
    return r;
  }

  private transition(record: ProductionRecord, target: ProductionLifecycle): void {
    if (!this.transitions[record.state].includes(target)) {
      throw new Error(`Invalid production transition: '${record.state}' → '${target}'`);
    }
    record.state = target;
  }

  async completeCopyediting(productionId: string): Promise<void> {
    const r = this.getOrThrow(productionId);
    this.transition(r, 'Copyediting');
    r.copyeditedAt = Date.now();
  }

  async completeLayout(productionId: string): Promise<void> {
    const r = this.getOrThrow(productionId);
    this.transition(r, 'Layout');
    r.layoutAt = Date.now();
  }

  async completeProofreading(productionId: string): Promise<void> {
    const r = this.getOrThrow(productionId);
    this.transition(r, 'Proofreading');
    r.proofreadAt = Date.now();
  }

  async approvForPublication(productionId: string, editorId: string): Promise<void> {
    const r = this.getOrThrow(productionId);
    this.transition(r, 'Publication Approval');
    r.approvedAt = Date.now();
    r.approvedBy = editorId;
  }

  async schedule(productionId: string): Promise<void> {
    const r = this.getOrThrow(productionId);
    this.transition(r, 'Scheduled');
    r.scheduledAt = Date.now();
    this.eventBus.emit('publication.production.scheduled', { productionId, submissionId: r.submissionId });
  }

  async getRecord(productionId: string): Promise<ProductionRecord | null> {
    return this.records.get(productionId) || null;
  }
}
