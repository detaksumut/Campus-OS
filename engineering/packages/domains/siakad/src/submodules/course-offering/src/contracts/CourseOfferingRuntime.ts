export interface CourseOfferingRuntime {
  readonly moduleName: 'course-offering';
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
}
