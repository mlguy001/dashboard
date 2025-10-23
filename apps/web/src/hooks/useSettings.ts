import { useContext } from 'react';
import { SettingsContext } from 'contexts/SettingsContext';
import type { SettingsContextType } from 'types/settings';

/**
 * Custom hook to consume SettingsContext
 *
 * Provides access to global settings state and setters:
 * - dateT: Current date (T)
 * - dateTMinus1: Previous business date (T-1)
 * - environment: Current environment (prod/uat/dev)
 * - setDateT: Function to update dateT
 * - setDateTMinus1: Function to update dateTMinus1
 * - setEnvironment: Function to update environment
 *
 * These settings are shared across all components in the app.
 *
 * @throws Error if used outside of SettingsProvider
 *
 * @example
 * const { dateT, environment, setDateT } = useSettings();
 */
export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);

  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return context;
};
