import React from 'react';

export const CertificateWidget: React.FC<{ certificateId: string }> = ({ certificateId }) => {
  return (
    <div className="certificate-badge" style={{ border: '2px solid gold', padding: '20px', textAlign: 'center' }}>
      <h2>Verified Certification</h2>
      <p>ID: {certificateId}</p>
      <p>Valid through: 2029</p>
    </div>
  );
};
