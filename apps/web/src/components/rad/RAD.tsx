import React, { useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useSettings } from 'hooks/useSettings';
import RPM from './rpm/RPM';
import IngestorHistoryViewer from './ingestor/IngestorHistoryViewer';
import IngestorSnapshot from './ingestor/IngestorSnapshot';
import IngestorForceRun from './ingestor/IngestorForceRun';
import ToolTabBar, { ToolTab } from '../shared/ToolTabBar';
import { RAD_TOOLS } from '../../config/toolConfig';

const RAD: React.FC = () => {
  const { permissions } = useAuth();
  const { getServerState } = useSettings();

  // Define tool configurations with sub-tools
  const ingestorTools: ToolTab[] = [
    { id: 'ingestor-history', name: 'History Viewer', ...RAD_TOOLS['ingestor-history'] },
    { id: 'ingestor-snapshot', name: 'Snapshot', ...RAD_TOOLS['ingestor-snapshot'] },
    { id: 'ingestor-force-run', name: 'Force Run', ...RAD_TOOLS['ingestor-force-run'] },
  ];

  const rpmTools: ToolTab[] = [
    {
      id: 'rpm',
      name: 'RPM',
      isLocal: RAD_TOOLS['rpm'].isLocal,
      isOnline: RAD_TOOLS['rpm'].serverConfig
        ? getServerState(RAD_TOOLS['rpm'].serverConfig.port)?.status === 'running'
        : undefined,
    },
  ];

  // State for active tabs in each group
  const [activeIngestorTab, setActiveIngestorTab] = useState(ingestorTools[0].id);
  const [activeRpmTab, setActiveRpmTab] = useState(rpmTools[0].id);

  // Component mapping
  const componentMap: { [key: string]: React.ReactElement } = {
    'ingestor-history': <IngestorHistoryViewer key="history" />,
    'ingestor-snapshot': <IngestorSnapshot key="snapshot" />,
    'ingestor-force-run': <IngestorForceRun key="force-run" />,
    'rpm': <RPM key="rpm" />,
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
      <h1>RAD</h1>
      <div style={{ marginTop: '2rem' }}>
        {/* Ingestor Tools */}
        {permissions.rad.includes('ingestor') && (
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{
              color: '#fff',
              marginBottom: '1rem',
              fontSize: '1.8rem',
              borderBottom: '3px solid #444',
              paddingBottom: '0.5rem'
            }}>
              Ingestor Tools
            </h2>
            <ToolTabBar
              tabs={ingestorTools}
              activeTab={activeIngestorTab}
              onTabChange={setActiveIngestorTab}
            />
            <div>
              {componentMap[activeIngestorTab]}
            </div>
          </div>
        )}

        {/* RPM Tools */}
        {permissions.rad.includes('rpm') && (
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{
              color: '#fff',
              marginBottom: '1rem',
              fontSize: '1.8rem',
              borderBottom: '3px solid #444',
              paddingBottom: '0.5rem'
            }}>
              RPM Tools
            </h2>
            <ToolTabBar
              tabs={rpmTools}
              activeTab={activeRpmTab}
              onTabChange={setActiveRpmTab}
            />
            <div>
              {componentMap[activeRpmTab]}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RAD;
