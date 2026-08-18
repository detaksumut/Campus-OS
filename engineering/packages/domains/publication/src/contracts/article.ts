export interface ArticleVersion {
  major: number;
  minor: number;
  revision: number;
}

export interface ArticleMetadata {
  title: string;
  abstract: string;
  keywords: string[];
  language: string;
}

export interface ArticleClassification {
  articleType: string;      // Research Article, Review, Case Study, etc.
  researchField: string;
  discipline: string;
  journalSection?: string;
}

export interface ArticleContent {
  mainFile: string;
  figures: string[];
  tables: string[];
  supplementary: string[];
}

export interface ArticleDto {
  articleId: string;
  version: ArticleVersion;
  metadata: ArticleMetadata;
  classification: ArticleClassification;
  content: ArticleContent;
}

export interface IArticleRuntime {
  createArticle(metadata: ArticleMetadata, classification: ArticleClassification, content: ArticleContent): Promise<string>;
  updateMetadata(articleId: string, metadata: Partial<ArticleMetadata>): Promise<void>;
  updateClassification(articleId: string, classification: Partial<ArticleClassification>): Promise<void>;
  updateContent(articleId: string, content: Partial<ArticleContent>): Promise<void>;
  incrementVersion(articleId: string, type: 'major' | 'minor' | 'revision'): Promise<void>;
  getArticle(articleId: string): Promise<ArticleDto | null>;
}
