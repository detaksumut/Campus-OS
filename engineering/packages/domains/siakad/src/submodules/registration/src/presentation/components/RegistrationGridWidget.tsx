import React from 'react';
import { useActionBus } from './ActionBus';

export const RegistrationGridWidget: React.FC = () => {
  const actionBus = useActionBus();

  const handleRefresh = () => {
    // Purely dispatches an Action ID, zero knowledge of the backend API
    actionBus.dispatch('LoadRegistrations');
  };

  return (
    <div className="registration-grid-widget">
      <h3>Registration List</h3>
      <button onClick={handleRefresh}>Refresh List</button>
      {/* Table implementation goes here */}
    </div>
  );
};
