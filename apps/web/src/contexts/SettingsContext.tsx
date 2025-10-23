import React, { createContext, useState, ReactNode } from 'react';
import type { SettingsContextType, Environment } from 'types/settings';
import type { ServerState } from 'types/localServer';

// Helper functions for date calculations
const getCurrentDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const getPreviousBusinessDate = (): string => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  if (dayOfWeek === 1) {
    // Monday -> go back to Friday
    today.setDate(today.getDate() - 3);
  } else if (dayOfWeek === 0) {
    // Sunday -> go back to Friday
    today.setDate(today.getDate() - 2);
  } else {
    // Other days -> go back one day
    today.setDate(today.getDate() - 1);
  }

  return today.toISOString().split('T')[0];
};

// Create context with undefined as initial value
export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [dateT, setDateT] = useState<string>(getCurrentDate());
  const [dateTMinus1, setDateTMinus1] = useState<string>(getPreviousBusinessDate());
  const [environment, setEnvironment] = useState<Environment>('prod');
  const [servers, setServers] = useState<Record<number, ServerState>>({});

  const updateServerState = (port: number, state: ServerState) => {
    setServers((prev) => ({
      ...prev,
      [port]: state,
    }));
  };

  const getServerState = (port: number): ServerState | undefined => {
    return servers[port];
  };

  const value: SettingsContextType = {
    dateT,
    dateTMinus1,
    environment,
    servers,
    setDateT,
    setDateTMinus1,
    setEnvironment,
    updateServerState,
    getServerState,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
