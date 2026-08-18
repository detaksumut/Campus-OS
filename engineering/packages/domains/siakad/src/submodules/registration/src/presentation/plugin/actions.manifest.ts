export const RegistrationActionsManifest = [
  {
    id: 'action:registration:submit',
    name: 'Submit Registration',
    endpoint: 'capability:registration:register_student',
    requiresConfirmation: true,
    telemetryEvent: 'RegistrationSubmitted'
  },
  {
    id: 'action:registration:approve',
    name: 'Approve Registration',
    endpoint: 'capability:registration:approve_student',
    requiresConfirmation: true,
    telemetryEvent: 'RegistrationApproved'
  },
  {
    id: 'action:registration:reject',
    name: 'Reject Registration',
    endpoint: 'capability:registration:reject_student',
    requiresConfirmation: true,
    telemetryEvent: 'RegistrationRejected'
  },
  {
    id: 'action:registration:cancel',
    name: 'Cancel Registration',
    endpoint: 'capability:registration:cancel',
    requiresConfirmation: true,
    telemetryEvent: 'RegistrationCanceled'
  }
];
