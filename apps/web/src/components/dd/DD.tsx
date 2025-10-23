import React from 'react';
import Publisher from './publisher/Publisher';
import Aggregator from './aggregator/Aggregator';
import Sodrisk from './sodrisk/Sodrisk';

interface DDProps {
  permissions: string[];
}

const DD: React.FC<DDProps> = ({ permissions }) => {
  const toolComponents: { [key: string]: React.ReactElement } = {
    publisher: <Publisher />,
    aggregator: <Aggregator />,
    sodrisk: <Sodrisk />,
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
      <h1>Derivative Desk (DD)</h1>
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

export default DD;
