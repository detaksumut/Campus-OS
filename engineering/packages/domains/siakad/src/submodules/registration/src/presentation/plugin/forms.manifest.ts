export const RegistrationFormsManifest = [
  {
    id: 'StudentRegistrationForm',
    title: 'New Student Registration',
    schemaVersion: '1.0',
    fields: [
      { name: 'applicantId', type: 'string', required: true },
      { name: 'studyProgramId', type: 'string', required: true },
      { name: 'generation', type: 'string', required: true }
    ],
    submissionEndpoint: 'capability:registration:register_student'
  }
];
