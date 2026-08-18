import { defineForm } from '@campus-os/presentation-core';

export const EnrollmentForm = defineForm({
  id: 'enrollment-form',
  fields: [
    { name: 'name', type: 'text', label: 'Full Name', required: true },
    { name: 'email', type: 'email', label: 'Email Address', required: true },
    { name: 'institution', type: 'text', label: 'Institution' },
    { name: 'submit', type: 'submit', label: 'Submit Enrollment' }
  ],
  validation: {
    email: 'email'
  },
  // Application Service Binding: The UI directly delegates submission intent to the Application Service API
  submissionPipeline: 'MembershipCommandApplicationService/submitEnrollment'
});
