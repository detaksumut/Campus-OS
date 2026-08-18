import { AcademicOrganization } from '../../domain/entities/AcademicOrganization';
import { UniversityId } from '../../domain/value-objects/OrganizationValueObjects';

export interface IOrganizationRepository {
  save(organization: AcademicOrganization): Promise<void>;
  findById(id: UniversityId): Promise<AcademicOrganization | null>;
}
