import { IArticleRuntime, ArticleMetadata, ArticleContent, ArticleDto } from '../contracts';

export class ArticleRuntime implements IArticleRuntime {
  private articles = new Map<string, ArticleDto>();

  async createArticle(metadata: ArticleMetadata, content: ArticleContent): Promise<string> {
    const articleId = `art_${Date.now()}`;
    this.articles.set(articleId, {
      articleId,
      version: { major: 1, minor: 0, revision: 0 },
      metadata,
      content
    });
    return articleId;
  }

  async updateMetadata(articleId: string, metadata: Partial<ArticleMetadata>): Promise<void> {
    const article = this.articles.get(articleId);
    if (!article) throw new Error('Article not found');
    
    article.metadata = { ...article.metadata, ...metadata };
    this.articles.set(articleId, article);
  }

  async updateContent(articleId: string, content: Partial<ArticleContent>): Promise<void> {
    const article = this.articles.get(articleId);
    if (!article) throw new Error('Article not found');
    
    article.content = { ...article.content, ...content };
    this.articles.set(articleId, article);
  }

  async incrementVersion(articleId: string, type: 'major' | 'minor' | 'revision'): Promise<void> {
    const article = this.articles.get(articleId);
    if (!article) throw new Error('Article not found');

    if (type === 'major') {
      article.version.major += 1;
      article.version.minor = 0;
      article.version.revision = 0;
    } else if (type === 'minor') {
      article.version.minor += 1;
      article.version.revision = 0;
    } else {
      article.version.revision += 1;
    }
  }

  async getArticle(articleId: string): Promise<ArticleDto | null> {
    return this.articles.get(articleId) || null;
  }
}
