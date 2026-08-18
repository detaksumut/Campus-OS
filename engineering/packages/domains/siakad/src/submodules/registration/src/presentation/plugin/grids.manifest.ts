export const RegistrationGridsManifest = [
  {
    id: 'RegistrationQueueGrid',
    title: 'Registration Approval Queue',
    columns: [
      { field: 'registrationId', label: 'ID', sortable: true },
      { field: 'applicantId', label: 'Applicant ID', sortable: true },
      { field: 'studyProgramId', label: 'Program', sortable: true, filterable: true },
      { field: 'status', label: 'Status', sortable: true, filterable: true },
      { field: 'registrationDate', label: 'Date', sortable: true }
    ],
    defaultSort: { field: 'registrationDate', order: 'desc' },
    dataEndpoint: 'capability:registration:query_status'
  }
];
