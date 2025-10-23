import React, { useState, useEffect } from 'react';
import NavigatorBar from 'components/NavigatorBar';
import MainArea from 'components/MainArea';

interface Permissions {
  tabs: string[];
  dd: string[];
  rad: string[];
  exotics: string[];
  ldfx: string[];
  fxg: string[];
  options: string[];
  inflation: string[];
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const [permissions, setPermissions] = useState<Permissions>({
    tabs: [],
    dd: [],
    rad: [],
    exotics: [],
    ldfx: [],
    fxg: [],
    options: [],
    inflation: [],
  });

  useEffect(() => {
    // Fetch user permissions on mount
    fetch('/api/user/permissions')
      .then((res) => res.json())
      .then((data) => setPermissions(data))
      .catch((err) => console.error('Failed to fetch permissions:', err));
  }, []);

  return (
    <div>
      <NavigatorBar setActiveTab={setActiveTab} permissions={permissions.tabs} />
      <MainArea activeTab={activeTab} permissions={permissions} />
    </div>
  );
};

export default App;
