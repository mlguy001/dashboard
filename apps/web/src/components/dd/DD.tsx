import React, { useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useSettings } from 'hooks/useSettings';
import Publisher from './publisher/Publisher';
import Aggregator from './aggregator/Aggregator';
import Sodrisk from './sodrisk/Sodrisk';
import ToolTabBar, { ToolTab } from '../shared/ToolTabBar';
import { DD_TOOLS } from '../../config/toolConfig';

const DD: React.FC = () => {
  const { permissions } = useAuth();
  const { getServerState } = useSettings();

  // Build tool tabs from permissions
  const toolTabs: ToolTab[] = permissions.dd.map((toolId) => {
    const config = DD_TOOLS[toolId];
    return {
      id: toolId,
      name: config.name,
      isLocal: config.isLocal,
      isOnline: config.serverConfig
        ? getServerState(config.serverConfig.port)?.status === 'running'
        : undefined,
    };
  });

  const [activeTab, setActiveTab] = useState(toolTabs.length > 0 ? toolTabs[0].id : '');

  // Component mapping
  const toolComponents: { [key: string]: React.ReactElement } = {
    publisher: <Publisher key="publisher" />,
    aggregator: <Aggregator key="aggregator" />,
    sodrisk: <Sodrisk key="sodrisk" />,
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
      <h1>DD</h1>
      <div style={{ marginTop: '2rem' }}>
        <ToolTabBar
          tabs={toolTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <div>
          {activeTab && toolComponents[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default DD;
