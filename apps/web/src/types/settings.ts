// Global settings types

export type Environment = 'prod' | 'uat' | 'dev';

export interface SettingsState {
  dateT: string;
  dateTMinus1: string;
  environment: Environment;
}

export interface SettingsContextType extends SettingsState {
  setDateT: (date: string) => void;
  setDateTMinus1: (date: string) => void;
  setEnvironment: (env: Environment) => void;
}
