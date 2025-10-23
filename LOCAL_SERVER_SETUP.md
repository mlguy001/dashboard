# Local Server Management - Implementation Guide

## Overview

The dashboard now supports local Python servers that can be managed through the Settings UI. This document explains the architecture and what needs to be implemented in the Electron main process.

## Architecture

### Frontend (React)

The frontend implementation is complete and includes:

1. **SettingsContext** - Manages server state across the app
2. **LocalServerManager** - UI component for managing servers in Settings
3. **LocalServerService** - Client-side service that communicates with Electron via IPC
4. **Tool Configuration** - Defines which tools use local vs remote servers

### Backend (Electron Main Process) - TO BE IMPLEMENTED

You need to implement IPC handlers in your Electron main process to:
- Start/stop Python server processes
- Track server states (running, stopped, error)
- Handle graceful shutdown

## Required Electron IPC Handlers

### 1. `server:start`

**Request:**
```typescript
{
  scriptPath: string;  // e.g., './servers/rad_rpm.py'
  port: number;        // e.g., 8001
  serverName: string;  // e.g., 'RAD RPM Server'
}
```

**Response:**
```typescript
{
  success: boolean;
  message?: string;
  error?: string;
}
```

**Implementation Notes:**
- Use Node's `child_process.spawn()` to start the Python script
- Pass the port as an environment variable or command-line argument
- Store the child process in a map (port -> ChildProcess)
- Return success/error based on spawn result

**Example:**
```javascript
const { spawn } = require('child_process');
const serverProcesses = new Map();

ipcMain.handle('server:start', async (event, request) => {
  try {
    const pythonProcess = spawn('python3', [request.scriptPath], {
      env: { ...process.env, PORT: request.port },
      detached: false,
    });

    pythonProcess.on('error', (err) => {
      console.error(`Failed to start ${request.serverName}:`, err);
    });

    serverProcesses.set(request.port, {
      process: pythonProcess,
      name: request.serverName,
      port: request.port,
    });

    return { success: true, message: `${request.serverName} started` };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
```

### 2. `server:stop`

**Request:**
```typescript
{
  port: number;
}
```

**Response:**
```typescript
{
  success: boolean;
  message?: string;
  error?: string;
}
```

**Implementation Notes:**
- Look up the process by port in your map
- Send SIGTERM for graceful shutdown
- Wait 5 seconds, then send SIGKILL if still running
- Remove from the map

**Example:**
```javascript
ipcMain.handle('server:stop', async (event, request) => {
  try {
    const serverInfo = serverProcesses.get(request.port);

    if (!serverInfo) {
      return { success: false, error: 'Server not found' };
    }

    return new Promise((resolve) => {
      serverInfo.process.on('exit', () => {
        serverProcesses.delete(request.port);
        resolve({ success: true, message: 'Server stopped' });
      });

      // Try graceful shutdown
      serverInfo.process.kill('SIGTERM');

      // Force kill after 5 seconds
      setTimeout(() => {
        if (!serverInfo.process.killed) {
          serverInfo.process.kill('SIGKILL');
        }
      }, 5000);
    });
  } catch (error) {
    return { success: false, error: error.message };
  }
});
```

### 3. `server:get-all-states`

**Request:** None

**Response:**
```typescript
Record<number, {
  port: number;
  status: 'running' | 'stopped' | 'starting' | 'error';
  pid?: number;
}>
```

**Implementation Notes:**
- Return the current state of all servers in your map
- Status should be 'running' if the process exists and is alive

**Example:**
```javascript
ipcMain.handle('server:get-all-states', async () => {
  const states = {};

  for (const [port, serverInfo] of serverProcesses.entries()) {
    states[port] = {
      port: port,
      status: serverInfo.process.killed ? 'stopped' : 'running',
      pid: serverInfo.process.pid,
    };
  }

  return states;
});
```

### 4. `server:initialize`

**Request:** None

**Response:** None (void)

**Implementation Notes:**
- Called when the app starts
- Read the tool configuration to find servers with `autoStart: true`
- Start those servers automatically
- This is optional but recommended for better UX

**Example:**
```javascript
ipcMain.handle('server:initialize', async () => {
  // Read tool config and start servers marked with autoStart: true
  const autoStartServers = [
    { scriptPath: './servers/rad_rpm.py', port: 8001, name: 'RAD RPM Server' },
    { scriptPath: './servers/dd_aggregator.py', port: 8002, name: 'DD Aggregator Server' },
  ];

  for (const server of autoStartServers) {
    // Start server (reuse logic from server:start handler)
  }
});
```

## Python Server Requirements

Each Python server should:

1. **Listen on the configured port**
   - Read port from environment variable or command-line arg
   ```python
   import os
   port = int(os.environ.get('PORT', 8001))
   ```

2. **Implement a health check endpoint**
   ```python
   @app.route('/health')
   def health():
       return {'status': 'healthy', 'uptime': time.time() - start_time}
   ```

3. **Handle graceful shutdown**
   ```python
   import signal
   import sys

   def signal_handler(sig, frame):
       print('Shutting down gracefully...')
       # Clean up resources
       sys.exit(0)

   signal.signal(signal.SIGTERM, signal_handler)
   ```

## Tool Configuration

Tools are configured in `/workspaces/dashboard/apps/web/src/config/toolConfig.ts`:

```typescript
export const RAD_TOOLS: Record<string, ToolConfig> = {
  'rpm': {
    id: 'rpm',
    name: 'RPM',
    isLocal: true,  // Mark as local tool
    serverConfig: {
      serverName: 'RAD RPM Server',
      scriptPath: './servers/rad_rpm.py',
      port: 8001,
      autoStart: true,
      healthCheckPath: '/health',
    },
  },
};
```

## How It Works

1. **User opens Settings tab** → LocalServerManager component mounts
2. **Component loads server states** → Calls `getAllServerStates()` via IPC
3. **User clicks "Start"** → Calls `startServer()` → IPC → Electron spawns Python process
4. **Health checks run every 30s** → HTTP request to `http://localhost:{port}/health`
5. **User clicks "Stop"** → Calls `stopServer()` → IPC → Electron kills process

## UI Features

- **Status indicators**: Green dot (running), red dot (error), gray dot (stopped), yellow dot (starting)
- **Server controls**: Start/Stop buttons, Health check button
- **Real-time updates**: Health checks every 30 seconds
- **Error handling**: Shows error messages if servers fail to start/stop

## Testing

1. Create a simple test Python server:
   ```python
   from flask import Flask, jsonify
   import os

   app = Flask(__name__)
   port = int(os.environ.get('PORT', 8001))

   @app.route('/health')
   def health():
       return jsonify({'status': 'healthy'})

   if __name__ == '__main__':
       app.run(port=port)
   ```

2. Run the app and navigate to Settings
3. Click "Start" on a server
4. Verify the status changes to "Running" with a green indicator
5. Click "Check" to verify health check works
6. Click "Stop" to shut down the server

## Next Steps

1. Implement the IPC handlers in your Electron main process
2. Create your Python server scripts in the `servers/` directory
3. Test the full lifecycle (start, health check, stop)
4. Configure which tools should use local vs remote servers in `toolConfig.ts`
