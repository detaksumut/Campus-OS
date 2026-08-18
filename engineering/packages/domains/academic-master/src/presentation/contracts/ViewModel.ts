/**
 * Pure ViewModel Contract.
 * Agnostic of React, Vue, HTML, HTTP.
 */
export interface FacultyViewModel {
  readonly id: string;
  readonly displayCode: string;
  readonly displayName: string;
  readonly statusLabel: string;
  readonly isSelectable: boolean;
}
