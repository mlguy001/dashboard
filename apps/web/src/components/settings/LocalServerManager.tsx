import React, { useState, useEffect } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { getAllLocalServers } from '../../config/toolConfig';
import {
  startServer,
  stopServer,
  checkServerHealth,
  getAllServerStates,
} from '../../services/localServerService';
import type { LocalServerConfig } from '../../config/toolConfig';
import type { ServerState } from '../../types/localServer';
import styles from './LocalServerManager.module.css';

const LocalServerManager: React.FC = () => {
  const { updateServerState, servers } = useSettings();
  const [localServers] = useState<LocalServerConfig[]>(getAllLocalServers());
  const [loading, setLoading] = useState<Record<number, boolean>>({});

  // Load initial server states
  useEffect(() => {
    const loadServerStates = async () => {
      const states = await getAllServerStates();
      Object.entries(states).forEach(([port, state]) => {
        updateServerState(Number(port), state);
      });
    };
    loadServerStates();
  }, [updateServerState]);

  // Health check interval for running servers
  useEffect(() => {
    const interval = setInterval(async () => {
      for (const serverConfig of localServers) {
        const currentState = servers[serverConfig.port];
        if (currentState?.status === 'running') {
          const health = await checkServerHealth(serverConfig.port);
          if (health.status === 'unhealthy') {
            updateServerState(serverConfig.port, {
              ...currentState,
              status: 'error',
              errorMessage: 'Health check failed',
            });
          }
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [localServers, servers, updateServerState]);

  const handleStart = async (serverConfig: LocalServerConfig) => {
    setLoading((prev) => ({ ...prev, [serverConfig.port]: true }));

    // Set starting state
    updateServerState(serverConfig.port, {
      port: serverConfig.port,
      status: 'starting',
    });

    try {
      const response = await startServer({
        scriptPath: serverConfig.scriptPath,
        port: serverConfig.port,
        serverName: serverConfig.serverName,
      });

      if (response.success) {
        updateServerState(serverConfig.port, {
          port: serverConfig.port,
          status: 'running',
          lastHealthCheck: new Date(),
        });
      } else {
        updateServerState(serverConfig.port, {
          port: serverConfig.port,
          status: 'error',
          errorMessage: response.error || 'Failed to start',
        });
      }
    } catch (error: any) {
      updateServerState(serverConfig.port, {
        port: serverConfig.port,
        status: 'error',
        errorMessage: error.message || 'Unknown error',
      });
    } finally {
      setLoading((prev) => ({ ...prev, [serverConfig.port]: false }));
    }
  };

  const handleStop = async (serverConfig: LocalServerConfig) => {
    setLoading((prev) => ({ ...prev, [serverConfig.port]: true }));

    try {
      const response = await stopServer({ port: serverConfig.port });

      if (response.success) {
        updateServerState(serverConfig.port, {
          port: serverConfig.port,
          status: 'stopped',
        });
      } else {
        updateServerState(serverConfig.port, {
          port: serverConfig.port,
          status: 'error',
          errorMessage: response.error || 'Failed to stop',
        });
      }
    } catch (error: any) {
      updateServerState(serverConfig.port, {
        port: serverConfig.port,
        status: 'error',
        errorMessage: error.message || 'Unknown error',
      });
    } finally {
      setLoading((prev) => ({ ...prev, [serverConfig.port]: false }));
    }
  };

  const handleCheckHealth = async (serverConfig: LocalServerConfig) => {
    const health = await checkServerHealth(serverConfig.port);
    const currentState = servers[serverConfig.port];

    if (health.status === 'healthy') {
      updateServerState(serverConfig.port, {
        ...currentState,
        port: serverConfig.port,
        status: 'running',
        lastHealthCheck: new Date(),
      });
    } else {
      updateServerState(serverConfig.port, {
        ...currentState,
        port: serverConfig.port,
        status: 'error',
        errorMessage: 'Server unreachable',
      });
    }
  };

  const getStatusColor = (status?: string): string => {
    switch (status) {
      case 'running':
        return styles.statusRunning;
      case 'stopped':
        return styles.statusStopped;
      case 'starting':
        return styles.statusStarting;
      case 'error':
        return styles.statusError;
      default:
        return styles.statusUnknown;
    }
  };

  const getStatusText = (status?: string): string => {
    switch (status) {
      case 'running':
        return 'Running';
      case 'stopped':
        return 'Stopped';
      case 'starting':
        return 'Starting...';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  if (localServers.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Local Servers</h3>
        <p className={styles.noServers}>No local servers configured</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Local Servers</h3>
      <p className={styles.description}>
        Manage local Python servers for tools. Servers will auto-start when the Settings page loads.
      </p>
      <div className={styles.serverList}>
        {localServers.map((serverConfig) => {
          const state = servers[serverConfig.port];
          const isLoading = loading[serverConfig.port];
          const isRunning = state?.status === 'running';

          return (
            <div key={serverConfig.port} className={styles.serverItem}>
              <div className={styles.serverInfo}>
                <div className={styles.serverHeader}>
                  <span className={styles.serverName}>{serverConfig.serverName}</span>
                  <span className={`${styles.statusDot} ${getStatusColor(state?.status)}`} />
                  <span className={styles.statusText}>{getStatusText(state?.status)}</span>
                </div>
                <div className={styles.serverDetails}>
                  <span>Port: {serverConfig.port}</span>
                  <span className={styles.separator}>•</span>
                  <span>{serverConfig.scriptPath}</span>
                </div>
                {state?.errorMessage && (
                  <div className={styles.errorMessage}>{state.errorMessage}</div>
                )}
                {state?.lastHealthCheck && (
                  <div className={styles.healthCheck}>
                    Last checked: {new Date(state.lastHealthCheck).toLocaleTimeString()}
                  </div>
                )}
              </div>
              <div className={styles.serverActions}>
                {!isRunning ? (
                  <button
                    onClick={() => handleStart(serverConfig)}
                    disabled={isLoading}
                    className={styles.startButton}
                  >
                    {isLoading ? 'Starting...' : 'Start'}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleCheckHealth(serverConfig)}
                      disabled={isLoading}
                      className={styles.checkButton}
                    >
                      Check
                    </button>
                    <button
                      onClick={() => handleStop(serverConfig)}
                      disabled={isLoading}
                      className={styles.stopButton}
                    >
                      {isLoading ? 'Stopping...' : 'Stop'}
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocalServerManager;
