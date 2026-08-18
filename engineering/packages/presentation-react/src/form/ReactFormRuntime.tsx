import React from 'react';

// A naive declarative form interpreter reading from the ABI
export const ReactFormRuntime: React.FC<{ formId: string; config?: any }> = ({ formId, config }) => {
  // In reality, this queries FormService for CompiledForm ABI
  const abi = config?.abi || {
    fields: [
      { name: 'email', type: 'email', label: 'Email Address' },
      { name: 'submit', type: 'submit', label: 'Save' }
    ],
    validation: {},
    submissionPipeline: 'user-service/register'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`[FormRuntime] Submitting to pipeline: ${abi.submissionPipeline}`);
  };

  return (
    <form className="react-form-runtime" onSubmit={handleSubmit}>
      {abi.fields.map((field: any, i: number) => (
        <div key={i} className="form-field">
          <label>{field.label}</label>
          <input type={field.type} name={field.name} />
        </div>
      ))}
    </form>
  );
};
