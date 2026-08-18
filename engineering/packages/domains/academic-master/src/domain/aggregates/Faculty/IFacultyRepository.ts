// Pure Repository Interface
import { Faculty } from './Faculty';

export interface IFacultyRepository {
  findById(id: string): Promise<Faculty | null>;
  save(entity: Faculty): Promise<void>;
}
