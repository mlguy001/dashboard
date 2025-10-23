import React from 'react';
import { useAuth } from 'hooks/useAuth';
import RPM from './rpm/RPM';

const RAD: React.FC = () => {
  const { permissions } = useAuth();

  const toolComponents: { [key: string]: React.ReactElement } = {
    ingestor: <RPM />,
    rpm: <RPM />,
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
      <h1>RAD</h1>
      <div style={{ marginTop: '2rem' }}>
        {permissions.rad.map((tool) => (
          <div key={tool} style={{ marginBottom: '2rem' }}>
            {toolComponents[tool]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RAD;
