import React, { useState } from 'react';
import { AuthProvider } from 'contexts/AuthContext';
import { SettingsProvider } from 'contexts/SettingsContext';
import NavigatorBar from 'components/NavigatorBar';
import MainArea from 'components/MainArea';
import { useAuth } from 'hooks/useAuth';

// Inner component that uses the auth context
const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const { loading, error } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#fff' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#ff6b6b' }}>
        <h2>Error loading permissions</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <NavigatorBar setActiveTab={setActiveTab} />
      <MainArea activeTab={activeTab} />
    </div>
  );
};

// Main App component with context providers
const App: React.FC = () => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </AuthProvider>
  );
};

export default App;
