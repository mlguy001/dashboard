/**
 * Local Server Types
 *
 * Type definitions for managing local Python servers that tools can connect to.
 */

export type ServerStatus = 'running' | 'stopped' | 'starting' | 'error';

export interface ServerState {
  port: number;
  status: ServerStatus;
  pid?: number;
  lastHealthCheck?: Date;
  errorMessage?: string;
}

export interface ServerHealthResponse {
  status: 'healthy' | 'unhealthy';
  uptime?: number;
  timestamp?: string;
}

export interface StartServerRequest {
  scriptPath: string;
  port: number;
  serverName: string;
}

export interface StopServerRequest {
  port: number;
}

export interface ServerControlResponse {
  success: boolean;
  message?: string;
  error?: string;
}
