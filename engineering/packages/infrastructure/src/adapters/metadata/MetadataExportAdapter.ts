import { IMetadataExportRuntime, MetadataFormat } from '@campus-os/application-core/src/contracts/infrastructure/IMetadataExportRuntime';

export class MetadataExportAdapter implements IMetadataExportRuntime {
  public async export(publicationId: string, format: MetadataFormat): Promise<string> {
    console.log(`[MetadataExportAdapter] Exporting publication ${publicationId} to ${format} format...`);
    
    switch (format) {
      case 'JATS':
        return `<article><front><article-meta><article-id pub-id-type="doi">10.5281/zenodo.${publicationId}</article-id></article-meta></front></article>`;
      case 'DC':
        return `<metadata><dc:title>Sample Publication</dc:title></metadata>`;
      case 'RIS':
        return `TY  - JOUR\nT1  - Sample Publication\nER  -`;
      case 'OPENAIRE':
        return `<resource xmlns="http://namespace.openaire.eu/schema/oaf">...</resource>`;
      default:
        throw new Error(`Export format ${format} is not yet implemented.`);
    }
  }
}
