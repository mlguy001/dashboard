import React from 'react';

interface NavigatorBarProps {
  setActiveTab: (tab: string) => void;
  permissions: string[];
}

const NavigatorBar: React.FC<NavigatorBarProps> = ({ setActiveTab, permissions }) => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#333', borderBottom: '2px solid #555' }}>
      {permissions.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          style={{
            marginRight: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#555',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {tab.toUpperCase()}
        </button>
      ))}
    </nav>
  );
};

export default NavigatorBar;
