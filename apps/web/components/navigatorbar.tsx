
import React from 'react';

interface NavigatorBarProps {
  setActiveTab: (tab: string) => void;
}

const tabs = ['settings', 'rad', 'dd', 'exotics', 'ldfx', 'fxg', 'options', 'inflation'];

const NavigatorBar: React.FC<NavigatorBarProps> = ({ setActiveTab }) => {
  return (
    <nav>
      {tabs.map(tab => (
        <button key={tab} onClick={() => setActiveTab(tab)}>
          {tab.toUpperCase()}
        </button>
      ))}
    </nav>
  );
};

export default NavigatorBar;
