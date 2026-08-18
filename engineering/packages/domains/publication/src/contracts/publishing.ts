export type ProductionLifecycle =
  | 'Accepted'
  | 'Copyediting'
  | 'Layout'
  | 'Proofreading'
  | 'Ready For Publication'
  | 'Publication Approval'
  | 'Scheduled';

export interface ProductionRecord {
  productionId: string;
  submissionId: string;
  articleId: string;
  state: ProductionLifecycle;
  startedAt: number;
  copyeditedAt?: number;
  layoutAt?: number;
  proofreadAt?: number;
  approvedAt?: number;
  scheduledAt?: number;
  approvedBy?: string;
}

export interface IProductionRuntime {
  startProduction(submissionId: string, articleId: string): Promise<string>;
  completeCopyediting(productionId: string): Promise<void>;
  completeLayout(productionId: string): Promise<void>;
  completeProofreading(productionId: string): Promise<void>;
  approvForPublication(productionId: string, editorId: string): Promise<void>;
  schedule(productionId: string): Promise<void>;
  getRecord(productionId: string): Promise<ProductionRecord | null>;
}

export type PublicationLifecycle = 'Scheduled' | 'Online First' | 'Issue Published' | 'Archived';

export interface PublicationRecord {
  publicationId: string;
  submissionId: string;
  articleId: string;
  doiId?: string;
  issueId?: string;
  volume?: number;
  issue?: number;
  startPage?: number;
  endPage?: number;
  state: PublicationLifecycle;
  scheduledAt: number;
  onlineFirstAt?: number;
  publishedAt?: number;
  archivedAt?: number;
}

export interface IPublicationRuntime {
  createScheduled(submissionId: string, articleId: string): Promise<string>;
  publishOnlineFirst(publicationId: string): Promise<void>;
  publishInIssue(publicationId: string, issueId: string, volume: number, issue: number, startPage: number, endPage: number): Promise<void>;
  archive(publicationId: string): Promise<void>;
  getRecord(publicationId: string): Promise<PublicationRecord | null>;
}

export interface IssueArticleRef {
  publicationId: string;
  articleId: string;
  startPage: number;
  endPage: number;
}

export interface IssueDto {
  issueId: string;
  journalId: string;
  volume: number;
  issue: number;
  year: number;
  title?: string;
  status: 'Draft' | 'Open' | 'Closed' | 'Published';
  publications: IssueArticleRef[];
  openedAt: number;
  publishedAt?: number;
}

export interface IIssueRuntime {
  createIssue(journalId: string, volume: number, issue: number, year: number, title?: string): Promise<string>;
  openIssue(issueId: string): Promise<void>;
  addPublication(issueId: string, ref: Omit<IssueArticleRef, 'publicationId'> & { publicationId: string }): Promise<void>;
  closeIssue(issueId: string): Promise<void>;
  publishIssue(issueId: string): Promise<void>;
  getIssue(issueId: string): Promise<IssueDto | null>;
}

export type DoiLifecycle = 'Requested' | 'Registered' | 'Verified' | 'Metadata Updated';

export interface DoiRecord {
  doiId: string;
  doi: string;
  publicationId: string;
  state: DoiLifecycle;
  requestedAt: number;
  registeredAt?: number;
  verifiedAt?: number;
  lastMetadataUpdateAt?: number;
  provider: string;
}

export interface IDoiRuntime {
  requestDoi(publicationId: string, provider: string): Promise<string>;
  registerDoi(doiId: string, doi: string): Promise<void>;
  verifyDoi(doiId: string): Promise<void>;
  updateMetadata(doiId: string): Promise<void>;
  getRecord(doiId: string): Promise<DoiRecord | null>;
  getByPublication(publicationId: string): Promise<DoiRecord | null>;
}

export interface ExternalIndexTarget {
  adapterId: string;
  name: string;
}

export interface IndexingRecord {
  indexingId: string;
  publicationId: string;
  internalIndexed: boolean;
  externalTargets: ExternalIndexTarget[];
  indexedAt: number;
}

export interface IIndexingRuntime {
  indexInternally(publicationId: string): Promise<void>;
  indexExternally(publicationId: string, adapters: string[]): Promise<void>;
  getRecord(publicationId: string): Promise<IndexingRecord | null>;
}

export interface CanonicalMetadata {
  doi?: string;
  title: string;
  abstract: string;
  keywords: string[];
  language: string;
  authors: { name: string; orcid?: string; institution: string }[];
  journal: string;
  volume?: number;
  issue?: number;
  startPage?: number;
  endPage?: number;
  publishedAt?: number;
  researchField: string;
}

export type ExportFormat = 'json' | 'jats-xml' | 'bibtex' | 'ris';

export interface IMetadataExportRuntime {
  buildCanonicalMetadata(publicationId: string): Promise<CanonicalMetadata>;
  export(publicationId: string, format: ExportFormat): Promise<string>;
}
