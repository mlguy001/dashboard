# Dashboard

Internal dashboard application with role-based access control for managing various financial desks and tools.

## Overview

This dashboard provides a unified interface for multiple financial desks (DD, RAD, Exotics, LDFX, FXG, Options, Inflation) with role-based permissions controlling access to tabs and tools.

### Features

- **Role-Based Access Control (RBAC)**: Users see only tabs and tools they have permissions for
- **Multiple Desks**: DD, RAD, Exotics, LDFX, FXG, Options, Inflation
- **Global Settings**: Shared date and environment configuration across all tabs
- **Modern Stack**: React + TypeScript frontend, Python/Tornado backend

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool with hot module replacement
- **CSS Modules** - Scoped component styling

### Backend
- **Python 3.x** - Programming language
- **Tornado** - Async web framework
- **RBAC** - Role-based access control system

## Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.8+
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dashboard
   ```

2. **Install frontend dependencies**
   ```bash
   cd apps/web
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../api
   pip install -r requirements.txt
   ```

### Running the Application

**Option 1: Run both servers with one command (Recommended)**
```bash
# From project root
./scripts/run_dev.sh
```

**Option 2: Run servers separately**

Terminal 1 (Backend):
```bash
cd apps/api
python server.py
```

Terminal 2 (Frontend):
```bash
cd apps/web
npm run dev
```

### Accessing the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8888

## Project Structure

```
dashboard/
├── docs/                      # Documentation
│   ├── implementation-plan.md # Phase-by-phase development plan
│   ├── architecture.md        # Architecture decisions
│   ├── file-structure.md      # Complete file tree reference
│   └── development-guide.md   # Development workflow and commands
│
├── apps/
│   ├── api/                   # Backend (Python/Tornado)
│   │   ├── server.py          # Entry point
│   │   ├── auth/              # Authentication & authorization
│   │   ├── handlers/          # API endpoints (future)
│   │   └── datastore/         # Data storage
│   │
│   └── web/                   # Frontend (React/TypeScript)
│       ├── src/               # Source code
│       │   ├── components/    # React components
│       │   ├── contexts/      # Global state (future)
│       │   ├── hooks/         # Custom hooks (future)
│       │   ├── services/      # API calls (future)
│       │   └── styles/        # CSS
│       ├── package.json       # Dependencies
│       └── vite.config.ts     # Build configuration
│
└── scripts/                   # Utility scripts
    └── run_dev.sh             # Run both dev servers
```

## Development

### Common Commands

```bash
# Frontend
cd apps/web
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build

# Backend
cd apps/api
python server.py # Start server
```

### Git Workflow

See [`docs/development-guide.md`](docs/development-guide.md) for detailed git workflow including:
- Creating feature branches
- Committing changes
- Creating pull requests
- Code review process

### Documentation

- **[Implementation Plan](docs/implementation-plan.md)** - 8-phase development plan with tasks
- **[Architecture](docs/architecture.md)** - Technical decisions and patterns explained
- **[File Structure](docs/file-structure.md)** - Complete file tree and naming conventions
- **[Development Guide](docs/development-guide.md)** - Commands, workflow, troubleshooting

## Current Status

**Phase 1: Complete ✓**
- Vite build system configured
- React + TypeScript setup
- All base components created
- Documentation completed

**Next Phase: React Context (Phase 2)**
- Add AuthContext for user/permissions
- Add SettingsContext for global settings
- Remove prop drilling

## Available Tabs & Tools

### Tabs
- **Settings** - Global configuration (dateT, environment)
- **DD** - Derivative Desk (Publisher, Aggregator, SOD Risk)
- **RAD** - RAD desk (RPM tool)
- **Exotics** - Exotics desk (RPM tool)
- **LDFX** - LDFX desk (RPM tool)
- **FXG** - FXG desk (RPM tool)
- **Options** - Options desk (RPM tool)
- **Inflation** - Inflation desk (RPM tool)

### Tool Types
- **Link Tools** - Open external URLs (Publisher, Aggregator)
- **Data Tools** - Fetch and display data (RPM in RAD tab - Phase 6)
- **Form Tools** - Submit data to backend (RPM in RAD tab - Phase 6)

## Permissions

Users are assigned roles, and roles have permissions to access tabs and tools.

**Example Users** (defined in `apps/api/auth/access_control.py`):
- `user_a` - Admin (access to all tabs and tools)
- `user_b` - Group 1 (access to DD and Inflation)
- `user_c` - Group 2 (access to DD only)
- `user_d` - Multiple roles (access to DD, Inflation)
- `user_e` - RAD admin + FXG viewer
- `user_f` - Exotics viewer only
- `user_g` - Inflation editor only

To change the current user (development only), edit `apps/api/server.py:18`:
```python
user_id = 'user_a'  # Change to 'user_b', 'user_c', etc.
```

## Troubleshooting

### Frontend won't start
```bash
# Ensure dependencies are installed
cd apps/web
npm install
```

### Backend won't start
```bash
# Ensure dependencies are installed
cd apps/api
pip install -r requirements.txt
```

### Port already in use
```bash
# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9

# Kill process on port 8888 (backend)
lsof -ti:8888 | xargs kill -9
```

### API requests failing
- Ensure backend is running (`python server.py`)
- Check backend is accessible at http://localhost:8888
- Check browser console for errors (F12)

For more troubleshooting, see [`docs/development-guide.md`](docs/development-guide.md#troubleshooting).

## Production Deployment

Production deployment is planned for post-MVP. Key changes needed:

1. **Authentication**: Switch from hardcoded user to Windows Authentication (IIS reverse proxy)
2. **Database**: Replace in-memory storage with PostgreSQL/SQL Server
3. **Security**: Add HTTPS, CORS, CSRF protection
4. **Monitoring**: Add error tracking and logging
5. **Deployment**: Dockerize and set up CI/CD

See [`docs/architecture.md`](docs/architecture.md#production-considerations) for details.

## Contributing

1. Read [`docs/development-guide.md`](docs/development-guide.md)
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Test locally
5. Commit with descriptive message
6. Push and create a Pull Request

## License

Internal use only - proprietary software.

## Support

For questions or issues:
1. Check documentation in `docs/` folder
2. Search existing issues
3. Contact the development team

---

**Current Phase**: Phase 1 Complete ✓
**Next Phase**: Phase 2 - React Context for State Management
**Target**: MVP in 7 days
