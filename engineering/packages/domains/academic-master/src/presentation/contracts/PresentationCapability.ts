import { FacultyViewModel } from './ViewModel';
import { FacultyPresentationActions } from './PresentationActions';

/**
 * High-level capability contract exposing UI state and behaviors.
 */
export interface AcademicMasterPresentationCapability {
  readonly facultiesState: FacultyViewModel[];
  readonly actions: FacultyPresentationActions;
}
