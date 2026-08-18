import { CreateFacultyCommand } from '../../../contracts/commands/FacultyCommands';

/**
 * Pure Action Contract.
 * Represents user intent from UI without tying to DOM events.
 */
export interface FacultyPresentationActions {
  submitCreateFacultyForm(payload: CreateFacultyCommand): Promise<void>;
  navigateFacultyDetail(facultyId: string): void;
}
