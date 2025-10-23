// Global settings types

import { ServerState } from './localServer';

export type Environment = 'prod' | 'uat' | 'dev';

export interface SettingsState {
  dateT: string;
  dateTMinus1: string;
  environment: Environment;
  servers: Record<number, ServerState>;
}

export interface SettingsContextType extends SettingsState {
  setDateT: (date: string) => void;
  setDateTMinus1: (date: string) => void;
  setEnvironment: (env: Environment) => void;
  updateServerState: (port: number, state: ServerState) => void;
  getServerState: (port: number) => ServerState | undefined;
}
