export interface Scenario {
  id: string;
  name: string;
  targetWorkflow: string;
  initialState: any;
  mockInjections: {
    repositories: Record<string, any>;
    services: Record<string, any>;
  };
}

export interface SimulationEvent {
  timestamp: string;
  component: string;
  action: string;
  payload?: any;
}

export interface SimulationReport {
  scenarioId: string;
  workflow: string;
  startTime: string;
  endTime: string;
  status: 'Completed' | 'Failed';
  timeline: SimulationEvent[];
  finalState: any;
}
