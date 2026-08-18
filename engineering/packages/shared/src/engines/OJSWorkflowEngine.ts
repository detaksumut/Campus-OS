/**
 * OJS 3.x / PKP Workflow Engine
 * Standar Public Knowledge Project (PKP) & ARJUNA Kemendikbudristek RI
 * 5 Stages: Submission ➔ Peer-Review ➔ Copyediting ➔ Production ➔ Publication
 */

export type OJSEditorialStage = 'SUBMISSION' | 'REVIEW' | 'COPYEDITING' | 'PRODUCTION' | 'PUBLISHED' | 'DECLINED';
export type ReviewRecommendation = 'ACCEPT' | 'REVISIONS_REQUIRED' | 'RESUBMIT' | 'DECLINE';

export interface OJSSubmissionArticle {
  id: string;
  journalTitle: string;
  sintaGrade: string; // 'SINTA 1' - 'SINTA 6'
  title: string;
  abstract: string;
  authors: string[];
  currentStage: OJSEditorialStage;
  doi?: string;
  similarityScore: number;
  reviewRound: number;
  reviewersAssigned: string[];
  recommendation?: ReviewRecommendation;
}

export class OJSWorkflowEngine {
  static advanceStage(article: OJSSubmissionArticle, targetStage: OJSEditorialStage): OJSSubmissionArticle {
    const validTransitions: Record<OJSEditorialStage, OJSEditorialStage[]> = {
      'SUBMISSION': ['REVIEW', 'DECLINED'],
      'REVIEW': ['COPYEDITING', 'DECLINED'],
      'COPYEDITING': ['PRODUCTION', 'DECLINED'],
      'PRODUCTION': ['PUBLISHED'],
      'PUBLISHED': [],
      'DECLINED': []
    };

    if (!validTransitions[article.currentStage].includes(targetStage)) {
      throw new Error(`[OJS/PKP Workflow Error] Transisi tidak diizinkan dari ${article.currentStage} ke ${targetStage}`);
    }

    let updatedDoi = article.doi;
    if (targetStage === 'PRODUCTION' && !article.doi) {
      // Auto-assign Crossref DOI
      updatedDoi = `10.31294/ojs.v12i1.${Math.floor(Math.random() * 9000 + 1000)}`;
    }

    return {
      ...article,
      currentStage: targetStage,
      doi: updatedDoi
    };
  }

  static generateJATSXML(article: OJSSubmissionArticle): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE article PUBLIC "-//NLM//DTD JATS (Z39.96) Journal Archiving and Interchange DTD v1.2 20190208//EN" "JATS-archivearticle1.dtd">
<article article-type="research-article" dtd-version="1.2" xml:lang="id">
  <front>
    <journal-meta>
      <journal-title-group><journal-title>${article.journalTitle}</journal-title></journal-title-group>
      <custom-meta-group><custom-meta><meta-name>sinta-rank</meta-name><meta-value>${article.sintaGrade}</meta-value></custom-meta></custom-meta-group>
    </journal-meta>
    <article-meta>
      <article-id pub-id-type="doi">${article.doi || '10.31294/ojs.pending'}</article-id>
      <title-group><article-title>${article.title}</article-title></title-group>
      <contrib-group>
        ${article.authors.map(a => `<contrib contrib-type="author"><name><surname>${a}</surname></name></contrib>`).join('\n        ')}
      </contrib-group>
      <abstract><p>${article.abstract}</p></abstract>
    </article-meta>
  </front>
</article>`;
  }
}
