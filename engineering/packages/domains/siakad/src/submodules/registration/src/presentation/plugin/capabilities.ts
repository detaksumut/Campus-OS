export const RegistrationCapabilities = {
  exposes: [
    {
      id: 'capability:registration:register_student',
      description: 'Allows external modules to submit a student registration request programmatically'
    },
    {
      id: 'capability:registration:query_status',
      description: 'Allows external modules to check a student\'s registration status'
    }
  ],
  consumes: [
    'capability:identity:resolve_user',
    'capability:finance:verify_payment'
  ]
};
