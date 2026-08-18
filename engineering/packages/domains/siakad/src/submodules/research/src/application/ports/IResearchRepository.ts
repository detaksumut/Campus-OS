import { ResearchProject } from '../../domain/entities/ResearchProject';
import { ProjectId } from '../../domain/value-objects/ResearchValueObjects';

export interface IResearchRepository {
  saveProject(project: ResearchProject): Promise<void>;
  findProjectById(id: ProjectId): Promise<ResearchProject | null>;
}
