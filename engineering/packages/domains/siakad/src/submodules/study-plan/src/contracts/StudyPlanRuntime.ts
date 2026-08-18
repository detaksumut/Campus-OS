export interface StudyPlanRuntime {
  readonly moduleName: 'study-plan';
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
}
