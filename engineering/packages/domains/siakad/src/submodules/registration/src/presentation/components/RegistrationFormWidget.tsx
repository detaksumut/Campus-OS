import React from 'react';
import { useActionBus } from './ActionBus';

export const RegistrationFormWidget: React.FC = () => {
  const actionBus = useActionBus();

  const handleSubmit = () => {
    // Zero knowledge of CQRS or API endpoints, solely emits Action
    actionBus.dispatch('SubmitRegistration', { studentId: '123', programId: 'INF' });
  };

  return (
    <div className="registration-form-widget">
      <h3>Student Registration Form</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        {/* Form fields go here */}
        <button type="submit">Submit Registration</button>
      </form>
    </div>
  );
};
