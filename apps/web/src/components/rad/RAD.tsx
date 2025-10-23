import React from 'react';
import RPM from './rpm/RPM';

interface RADProps {
  permissions: string[];
}

const RAD: React.FC<RADProps> = ({ permissions }) => {
  const toolComponents: { [key: string]: React.ReactElement } = {
    ingestor: <RPM />,
    rpm: <RPM />,
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
      <h1>RAD</h1>
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

export default RAD;
