export type DiagnosticStatus = 'Healthy' | 'Warning' | 'Error' | 'Fatal';

export interface Validation {
  id: string;
  name: string;
  passed: boolean;
  message: string;
}

export interface Recommendation {
  id: string;
  message: string;
  actionCommand?: string;
}

export interface Diagnosis {
  component: string;
  status: DiagnosticStatus;
  validations: Validation[];
  recommendation?: Recommendation;
}

export interface DoctorReport {
  status: DiagnosticStatus;
  timestamp: string;
  diagnoses: Diagnosis[];
}

export interface IDoctorModule {
  name: string;
  diagnose(): Promise<Diagnosis>;
}
