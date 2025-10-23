import React, { createContext, useState, ReactNode } from 'react';
import type { SettingsContextType, Environment } from 'types/settings';

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

  const value: SettingsContextType = {
    dateT,
    dateTMinus1,
    environment,
    setDateT,
    setDateTMinus1,
    setEnvironment,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
