// Factory for Faculty
import { Faculty } from './Faculty';

export class FacultyFactory {
  public static create(id: string): Faculty {
    return new Faculty(id); // By-passing protected constructor inside factory
  }
}
