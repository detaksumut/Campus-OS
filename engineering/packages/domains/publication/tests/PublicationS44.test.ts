import { describe, it, expect } from 'vitest';
import { EventBus } from '@campus-os/kernel';
import { ProductionRuntime } from '../src/runtime/ProductionRuntime';
import { PublicationRuntime } from '../src/runtime/PublicationRuntime';
import { IssueRuntime } from '../src/runtime/IssueRuntime';
import { DoiRuntime } from '../src/runtime/DoiRuntime';
import { IndexingRuntime, CrossrefAdapter, GarudaAdapter } from '../src/runtime/IndexingRuntime';
import { ArticleRuntime } from '../src/runtime/ArticleRuntime';
import { MetadataExportRuntime } from '../src/runtime/MetadataExportRuntime';

describe('Publication - Sprint 4.4: Publishing & Production', () => {
  it('should move an accepted article through the full publishing pipeline', async () => {
    const bus = new EventBus();
    const production = new ProductionRuntime(bus);
    const publicationRuntime = new PublicationRuntime(bus);
    const issueRuntime = new IssueRuntime(bus);
    const doiRuntime = new DoiRuntime(bus);
    const indexing = new IndexingRuntime([new CrossrefAdapter(), new GarudaAdapter()], bus);

    // 1. Start Production
    const prodId = await production.startProduction('sub_1', 'art_1');
    await production.completeCopyediting(prodId);
    await production.completeLayout(prodId);
    await production.completeProofreading(prodId);
    await production.approvForPublication(prodId, 'editor_in_chief');
    await production.schedule(prodId);
    expect((await production.getRecord(prodId))?.state).toBe('Scheduled');

    // 2. Create Publication Record (Online First)
    const pubId = await publicationRuntime.createScheduled('sub_1', 'art_1');
    await publicationRuntime.publishOnlineFirst(pubId);
    expect((await publicationRuntime.getRecord(pubId))?.state).toBe('Online First');

    // 3. Request & Register DOI
    const doiId = await doiRuntime.requestDoi(pubId, 'crossref');
    await doiRuntime.registerDoi(doiId, '10.99999/campus-os.2026.001');
    await doiRuntime.verifyDoi(doiId);
    const doi = await doiRuntime.getRecord(doiId);
    expect(doi?.doi).toBe('10.99999/campus-os.2026.001');
    expect(doi?.state).toBe('Verified');

    // 4. Assign to Issue
    const issueId = await issueRuntime.createIssue('journal_1', 1, 1, 2026, 'Issue 1');
    await issueRuntime.openIssue(issueId);
    await issueRuntime.addPublication(issueId, { publicationId: pubId, articleId: 'art_1', startPage: 1, endPage: 14 });
    await issueRuntime.closeIssue(issueId);

    // 5. Publish in Issue
    await publicationRuntime.publishInIssue(pubId, issueId, 1, 1, 1, 14);
    await issueRuntime.publishIssue(issueId);
    expect((await publicationRuntime.getRecord(pubId))?.state).toBe('Issue Published');

    // 6. Index
    await indexing.indexInternally(pubId);
    await indexing.indexExternally(pubId, ['crossref', 'garuda']);
    const indexRecord = await indexing.getRecord(pubId);
    expect(indexRecord?.internalIndexed).toBe(true);
    expect(indexRecord?.externalTargets.length).toBe(2);
  });

  it('should export metadata in all formats', async () => {
    const bus = new EventBus();
    const article = new ArticleRuntime();
    const pub = new PublicationRuntime(bus);

    const artId = await article.createArticle(
      { title: 'Advances in AI', abstract: 'This paper explores...', keywords: ['AI', 'ML'], language: 'en' },
      { articleType: 'Research Article', researchField: 'Computer Science', discipline: 'CS' },
      { mainFile: 'paper.pdf', figures: [], tables: [], supplementary: [] }
    );
    const pubId = await pub.createScheduled('sub_x', artId);
    await pub.publishOnlineFirst(pubId);
    await pub.publishInIssue(pubId, 'issue_1', 1, 1, 10, 20);

    const exporter = new MetadataExportRuntime(pub, article);
    const json = await exporter.export(pubId, 'json');
    const bibtex = await exporter.export(pubId, 'bibtex');
    const ris = await exporter.export(pubId, 'ris');
    const xml = await exporter.export(pubId, 'jats-xml');

    expect(json).toContain('Advances in AI');
    expect(bibtex).toContain('@article');
    expect(ris).toContain('TY  - JOUR');
    expect(xml).toContain('<article-title>');
  });

  it('should block DOI metadata update before verification', async () => {
    const bus = new EventBus();
    const doi = new DoiRuntime(bus);
    const doiId = await doi.requestDoi('pub_x', 'crossref');
    await doi.registerDoi(doiId, '10.1/test');
    await expect(doi.updateMetadata(doiId)).rejects.toThrow(/Verified/);
  });
});
