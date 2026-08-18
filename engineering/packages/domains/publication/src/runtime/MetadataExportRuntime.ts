import { IMetadataExportRuntime, CanonicalMetadata, ExportFormat } from '../contracts';
import { IPublicationRuntime, IArticleRuntime } from '../contracts';

export class MetadataExportRuntime implements IMetadataExportRuntime {
  constructor(
    private publicationRuntime: IPublicationRuntime,
    private articleRuntime: IArticleRuntime
  ) {}

  async buildCanonicalMetadata(publicationId: string): Promise<CanonicalMetadata> {
    const pub = await this.publicationRuntime.getRecord(publicationId);
    if (!pub) throw new Error('Publication not found');

    const article = await this.articleRuntime.getArticle(pub.articleId);
    if (!article) throw new Error('Article not found');

    return {
      title: article.metadata.title,
      abstract: article.metadata.abstract,
      keywords: article.metadata.keywords,
      language: article.metadata.language,
      researchField: article.classification.researchField,
      authors: [], // Populated from AuthorRuntime via DI in production
      journal: 'Campus OS Journal',
      volume: pub.volume,
      issue: pub.issue,
      startPage: pub.startPage,
      endPage: pub.endPage,
      publishedAt: pub.publishedAt
    };
  }

  async export(publicationId: string, format: ExportFormat): Promise<string> {
    const meta = await this.buildCanonicalMetadata(publicationId);

    switch (format) {
      case 'json':
        return JSON.stringify(meta, null, 2);

      case 'jats-xml':
        return `<?xml version="1.0" encoding="UTF-8"?>
<article xmlns:xlink="http://www.w3.org/1999/xlink" article-type="research-article">
  <front>
    <article-meta>
      <title-group><article-title>${meta.title}</article-title></title-group>
      <abstract><p>${meta.abstract}</p></abstract>
      <kwd-group>${meta.keywords.map(k => `<kwd>${k}</kwd>`).join('')}</kwd-group>
    </article-meta>
  </front>
</article>`;

      case 'bibtex':
        return `@article{campusos${Date.now()},
  title   = {${meta.title}},
  journal = {${meta.journal}},
  volume  = {${meta.volume || ''}},
  number  = {${meta.issue || ''}},
  pages   = {${meta.startPage}--${meta.endPage}},
  year    = {${meta.publishedAt ? new Date(meta.publishedAt).getFullYear() : ''}},
  keywords = {${meta.keywords.join(', ')}}
}`;

      case 'ris':
        return `TY  - JOUR
TI  - ${meta.title}
JO  - ${meta.journal}
VL  - ${meta.volume || ''}
IS  - ${meta.issue || ''}
SP  - ${meta.startPage || ''}
EP  - ${meta.endPage || ''}
KW  - ${meta.keywords.join('\nKW  - ')}
LA  - ${meta.language}
ER  -`;

      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }
}
