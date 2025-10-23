/**
 * Tool Configuration
 *
 * Defines configuration for all tools including their local/remote status,
 * server settings, and display properties.
 */

export interface ToolConfig {
  id: string;
  name: string;
  isLocal: boolean;
  serverConfig?: LocalServerConfig;
}

export interface LocalServerConfig {
  serverName: string;
  scriptPath: string;
  port: number;
  autoStart: boolean;
  healthCheckPath?: string;
}

/**
 * RAD Tool Configurations
 */
export const RAD_TOOLS: Record<string, ToolConfig> = {
  'ingestor-history': {
    id: 'ingestor-history',
    name: 'History Viewer',
    isLocal: false,
  },
  'ingestor-snapshot': {
    id: 'ingestor-snapshot',
    name: 'Snapshot',
    isLocal: false,
  },
  'ingestor-force-run': {
    id: 'ingestor-force-run',
    name: 'Force Run',
    isLocal: false,
  },
  'rpm': {
    id: 'rpm',
    name: 'RPM',
    isLocal: true,
    serverConfig: {
      serverName: 'RAD RPM Server',
      scriptPath: './servers/rad_rpm.py',
      port: 8001,
      autoStart: true,
      healthCheckPath: '/health',
    },
  },
};

/**
 * DD (Differential Discounting) Tool Configurations
 */
export const DD_TOOLS: Record<string, ToolConfig> = {
  'publisher': {
    id: 'publisher',
    name: 'Publisher',
    isLocal: false,
  },
  'aggregator': {
    id: 'aggregator',
    name: 'Aggregator',
    isLocal: true,
    serverConfig: {
      serverName: 'DD Aggregator Server',
      scriptPath: './servers/dd_aggregator.py',
      port: 8002,
      autoStart: true,
      healthCheckPath: '/health',
    },
  },
  'sodrisk': {
    id: 'sodrisk',
    name: 'SOD Risk',
    isLocal: false,
  },
};

/**
 * Get all local servers that should be managed
 */
export const getAllLocalServers = (): LocalServerConfig[] => {
  const allTools = [...Object.values(RAD_TOOLS), ...Object.values(DD_TOOLS)];
  return allTools
    .filter((tool) => tool.isLocal && tool.serverConfig)
    .map((tool) => tool.serverConfig!);
};

/**
 * Get tool configuration by ID
 */
export const getToolConfig = (toolId: string): ToolConfig | undefined => {
  return RAD_TOOLS[toolId] || DD_TOOLS[toolId];
};
