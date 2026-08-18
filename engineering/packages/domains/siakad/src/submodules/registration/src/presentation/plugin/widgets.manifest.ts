export const RegistrationWidgetsManifest = [
  {
    id: 'RegistrationHeroWidget',
    name: 'Registration Portal Hero',
    version: '1.0.0',
    provider: 'local',
    priority: 'high',
    zone: 'RegistrationWorkbench:hero',
    permission: 'registration:view',
    actions: ['action:registration:submit'],
    inputs: [],
    outputs: [],
    refreshPolicy: 'never',
    telemetryProfile: 'basic',
    lazy: true,
    cachePolicy: 'memory',
    fallback: 'defaultError',
    errorBoundary: true,
    metadata: {
      theme: 'dark'
    }
  },
  {
    id: 'RegistrationKPIWidget',
    version: '1.0.0',
    provider: 'local',
    priority: 'medium',
    zone: 'RegistrationWorkbench:kpi',
    permission: 'registration:view',
    actions: [],
    inputs: [],
    outputs: [],
    refreshPolicy: 'interval:5m',
    telemetryProfile: 'metrics_only',
    lazy: true,
    cachePolicy: 'memory',
    fallback: 'defaultError',
    errorBoundary: true
  }
];
