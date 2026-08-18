import { IInfrastructureWorkflowOrchestrator } from '@campus-os/application-core/src/contracts/infrastructure/IInfrastructureWorkflowOrchestrator';
import { CanonicalMetadataModel } from '@campus-os/application-core/src/contracts/infrastructure/metadata/CanonicalMetadataModel';
import { ZenodoDoiAdapter } from '../../adapters/zenodo/ZenodoDoiAdapter';
import { ZenodoRepositoryAdapter } from '../../adapters/zenodo/ZenodoRepositoryAdapter';
import { OpenAireAdapter } from '../../adapters/openaire/OpenAireAdapter';
import { ArjunaAdapter } from '../../adapters/arjuna/ArjunaAdapter';

export interface PublicationWorkflowContext {
  publicationId: string;
  metadata: CanonicalMetadataModel;
  archivePath: string;
}

export class PublicationInfrastructureWorkflow implements IInfrastructureWorkflowOrchestrator<PublicationWorkflowContext, void> {
  constructor(
    private doiAdapter: ZenodoDoiAdapter,
    private repoAdapter: ZenodoRepositoryAdapter,
    private openAireAdapter: OpenAireAdapter,
    private arjunaAdapter: ArjunaAdapter
  ) {}

  public async execute(context: PublicationWorkflowContext): Promise<void> {
    console.log(`[PublicationWorkflow] Starting infrastructure pipeline for ${context.publicationId}`);
    
    // Step 1: Reserve DOI
    const doi = await this.doiAdapter.requestDoi(context.publicationId);
    
    // Step 2: Create Deposit and Upload
    const depositId = await this.repoAdapter.createDeposit(context.metadata);
    await this.repoAdapter.uploadFile(depositId, context.archivePath, Buffer.from('mock'));
    
    // Step 3: Publish Repository
    await this.repoAdapter.publishDeposit(depositId);
    
    // Step 4: Harvest OpenAIRE
    await this.openAireAdapter.harvestMetadata(context.publicationId);
    
    // Step 5: Submit Arjuna
    await this.arjunaAdapter.harvestMetadata(context.publicationId);

    console.log(`[PublicationWorkflow] Completed successfully for ${context.publicationId}`);
  }

  public async compensate(context: PublicationWorkflowContext, error: Error): Promise<void> {
    console.log(`[PublicationWorkflow] Compensating workflow failure for ${context.publicationId}: ${error.message}`);
    // Rollback logic (e.g. discarding un-published Zenodo drafts)
  }

  public async getStatus(workflowId: string): Promise<string> {
    return 'COMPLETED';
  }
}
