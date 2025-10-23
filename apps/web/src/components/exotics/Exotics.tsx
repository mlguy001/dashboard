import React from 'react';
import RPM from './rpm/RPM';

interface ExoticsProps {
  permissions: string[];
}

const Exotics: React.FC<ExoticsProps> = ({ permissions }) => {
  const toolComponents: { [key: string]: React.ReactElement } = {
    rpm: <RPM />,
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
      <h1>Exotics</h1>
      <div style={{ marginTop: '2rem' }}>
        {permissions.map((tool) => (
          <div key={tool} style={{ marginBottom: '2rem' }}>
            {toolComponents[tool]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exotics;
