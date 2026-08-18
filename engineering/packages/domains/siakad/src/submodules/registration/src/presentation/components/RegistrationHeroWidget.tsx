import React from 'react';
import { GlobalRegistry, ActionRuntime } from '@campus-os/presentation-kernel';

const actionRuntime = new ActionRuntime(GlobalRegistry);

export default function RegistrationHeroWidget() {
  const handleSubmit = () => {
    // Action Runtime intercepts the call!
    actionRuntime.execute('action:registration:submit', { applicant: '123' });
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden h-full flex flex-col justify-center">
      <div className="relative z-10">
        <h2 className="text-3xl font-black mb-2 tracking-tight">Registration Portal</h2>
        <p className="text-blue-100 mb-6 max-w-md">Welcome to the central admissions and registration module. Manage student applications seamlessly.</p>
        <button 
          onClick={handleSubmit}
          className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-2.5 rounded-lg font-bold text-sm shadow-sm transition-colors"
        >
          Submit Registration
        </button>
      </div>
      <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute right-10 bottom-0 w-32 h-32 bg-white opacity-10 rounded-full translate-y-1/3"></div>
    </div>
  );
}
