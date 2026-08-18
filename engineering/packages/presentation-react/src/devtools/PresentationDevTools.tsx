import React, { useState } from 'react';

export const PresentationDevTools: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button 
        style={{ position: 'fixed', bottom: 10, right: 10, zIndex: 9999 }}
        onClick={() => setIsOpen(true)}
      >
        🛠 Campus OS DevTools
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed', bottom: 0, right: 0, width: 400, height: '50vh',
      background: '#1e1e1e', color: '#fff', zIndex: 10000, overflowY: 'auto',
      fontFamily: 'monospace', padding: 10
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Presentation Kernel DevTools</h3>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
      <hr />
      <div>
        <h4>Frozen Registry Snapshot</h4>
        <pre>{JSON.stringify({ pages: 12, widgets: 45, capabilities: 8 }, null, 2)}</pre>
        <h4>Dependency Graph</h4>
        <pre>{JSON.stringify({ 'membership': ['ui-core'] }, null, 2)}</pre>
        <h4>ABI Version</h4>
        <p>v1.0.0</p>
      </div>
    </div>
  );
};
