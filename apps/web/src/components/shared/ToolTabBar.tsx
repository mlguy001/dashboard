import React from 'react';
import styles from './ToolTabBar.module.css';
import LocalBadge from './LocalBadge';

export interface ToolTab {
  id: string;
  name: string;
  isLocal?: boolean;
  isOnline?: boolean;
}

interface ToolTabBarProps {
  tabs: ToolTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const ToolTabBar: React.FC<ToolTabBarProps> = ({ tabs, activeTab, onTabChange }) => {
  // Don't render anything if there's only one tab
  if (tabs.length <= 1) {
    return null;
  }

  return (
    <div className={styles.tabBar}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className={styles.tabName}>{tab.name}</span>
          {tab.isLocal !== undefined && (
            <LocalBadge isLocal={tab.isLocal} isOnline={tab.isOnline} />
          )}
        </button>
      ))}
    </div>
  );
};

export default ToolTabBar;
