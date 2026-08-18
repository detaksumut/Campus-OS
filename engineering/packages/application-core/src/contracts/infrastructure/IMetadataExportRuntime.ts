export type MetadataFormat = 
  | 'JATS' 
  | 'DC' 
  | 'DATACITE' 
  | 'BIBTEX' 
  | 'RIS' 
  | 'CROSSREF' 
  | 'JSONLD' 
  | 'SCHEMAORG' 
  | 'OPENAIRE';

export interface IMetadataExportRuntime {
  export(publicationId: string, format: MetadataFormat): Promise<string>;
}
