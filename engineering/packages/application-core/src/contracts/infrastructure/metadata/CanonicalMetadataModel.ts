export interface CanonicalMetadataModel {
  title: string;
  abstract: string;
  authors: Array<{
    name: string;
    orcid?: string;
    affiliation?: string;
  }>;
  keywords: string[];
  publicationDate: string;
  journal?: {
    title: string;
    issn?: string;
    volume?: string;
    issue?: string;
  };
  license: string;
  language: string;
}
