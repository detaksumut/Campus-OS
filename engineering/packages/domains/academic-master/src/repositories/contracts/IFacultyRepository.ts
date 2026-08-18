import { Faculty } from '../../aggregates/Faculty/Faculty';

export interface IFacultyRepository {
  findById(id: string): Promise<Faculty | null>;
  save(entity: Faculty): Promise<void>;
}
