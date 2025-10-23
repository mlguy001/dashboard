import React from 'react';
import { useAuth } from 'hooks/useAuth';
import RPM from './rpm/RPM';
import IngestorHistoryViewer from './ingestor/IngestorHistoryViewer';
import IngestorSnapshot from './ingestor/IngestorSnapshot';
import IngestorForceRun from './ingestor/IngestorForceRun';

const RAD: React.FC = () => {
  const { permissions } = useAuth();

  // Define tool groups with their sub-components
  const toolGroups: { [key: string]: { title: string; components: React.ReactElement[] } } = {
    ingestor: {
      title: 'Ingestor Tools',
      components: [
        <IngestorHistoryViewer key="history" />,
        <IngestorSnapshot key="snapshot" />,
        <IngestorForceRun key="force-run" />,
      ],
    },
    rpm: {
      title: 'RPM Tools',
      components: [<RPM key="rpm" />],
    },
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
      <h1>RAD</h1>
      <div style={{ marginTop: '2rem' }}>
        {permissions.rad.map((tool) => {
          const toolGroup = toolGroups[tool];
          if (!toolGroup) return null;

          return (
            <div key={tool} style={{ marginBottom: '3rem' }}>
              <h2 style={{
                color: '#fff',
                marginBottom: '1.5rem',
                fontSize: '1.8rem',
                borderBottom: '3px solid #444',
                paddingBottom: '0.5rem'
              }}>
                {toolGroup.title}
              </h2>
              <div>
                {toolGroup.components.map((component) => component)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RAD;
