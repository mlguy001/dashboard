/**
 * Local Server Service
 *
 * Provides interface for managing local Python servers through Electron IPC.
 * This is a client-side service that communicates with the main process.
 */

import type {
  StartServerRequest,
  StopServerRequest,
  ServerControlResponse,
  ServerHealthResponse,
  ServerState,
} from '../types/localServer';

// Check if we're running in Electron
const isElectron = (): boolean => {
  return !!(window && (window as any).electron);
};

/**
 * Start a local server
 */
export const startServer = async (request: StartServerRequest): Promise<ServerControlResponse> => {
  if (!isElectron()) {
    return {
      success: false,
      error: 'Not running in Electron environment',
    };
  }

  try {
    const response = await (window as any).electron.invoke('server:start', request);
    return response;
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to start server',
    };
  }
};

/**
 * Stop a local server
 */
export const stopServer = async (request: StopServerRequest): Promise<ServerControlResponse> => {
  if (!isElectron()) {
    return {
      success: false,
      error: 'Not running in Electron environment',
    };
  }

  try {
    const response = await (window as any).electron.invoke('server:stop', request);
    return response;
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to stop server',
    };
  }
};

/**
 * Check health of a local server
 */
export const checkServerHealth = async (port: number): Promise<ServerHealthResponse> => {
  try {
    const response = await fetch(`http://localhost:${port}/health`);
    if (response.ok) {
      const data = await response.json();
      return {
        status: 'healthy',
        ...data,
      };
    }
    return { status: 'unhealthy' };
  } catch (error) {
    return { status: 'unhealthy' };
  }
};

/**
 * Get current state of all servers
 */
export const getAllServerStates = async (): Promise<Record<number, ServerState>> => {
  if (!isElectron()) {
    return {};
  }

  try {
    const states = await (window as any).electron.invoke('server:get-all-states');
    return states || {};
  } catch (error) {
    console.error('Failed to get server states:', error);
    return {};
  }
};

/**
 * Initialize server states on app startup
 * This will check which servers should be auto-started and start them
 */
export const initializeServers = async (): Promise<void> => {
  if (!isElectron()) {
    console.warn('Not running in Electron, skipping server initialization');
    return;
  }

  try {
    await (window as any).electron.invoke('server:initialize');
  } catch (error) {
    console.error('Failed to initialize servers:', error);
  }
};
