# Dashboard File Structure Reference

## Complete File Tree

```
/workspaces/dashboard/
│
├── .claude/                          # Claude Code configuration (optional)
│   ├── config.json                   # Claude settings
│   └── commands/                     # Custom slash commands
│       └── deploy.md                 # Example: /deploy command
│
├── .git/                             # Git repository
│
├── docs/                             # Documentation
│   ├── implementation-plan.md        # Phase-by-phase plan with checkboxes
│   ├── architecture.md               # Architecture decisions and rationale
│   ├── file-structure.md             # This file
│   └── development-guide.md          # Development workflow and commands
│
├── apps/
│   ├── api/                          # Backend (Python/Tornado)
│   │   ├── server.py                 # Entry point, route definitions
│   │   ├── requirements.txt          # Python dependencies (tornado, etc.)
│   │   │
│   │   ├── auth/                     # Authentication & authorization
│   │   │   ├── __init__.py           # Makes it a Python module
│   │   │   ├── access_control.py     # USER_ROLES, ROLES_PERMISSIONS
│   │   │   ├── main.py               # get_user_permissions() logic
│   │   │   └── decorators.py         # @requires_permissions decorator
│   │   │
│   │   ├── handlers/                 # API endpoint handlers
│   │   │   ├── __init__.py
│   │   │   ├── base.py               # BaseHandler (get_current_user, etc.)
│   │   │   ├── permissions.py        # PermissionsHandler (/api/user/permissions)
│   │   │   └── rad.py                # RAD endpoints (/api/rad/data, /api/rad/submit)
│   │   │
│   │   ├── datastore/                # Data storage
│   │   │   ├── __init__.py
│   │   │   └── hydrastore.py         # In-memory mock storage (replace with real DB later)
│   │   │
│   │   └── utils/                    # Utility functions
│   │       ├── __init__.py
│   │       └── auth_helpers.py       # Auth helper functions
│   │
│   └── web/                          # Frontend (React/TypeScript/Vite)
│       ├── package.json              # npm dependencies (react, vite, typescript)
│       ├── package-lock.json         # Lockfile for exact versions
│       ├── tsconfig.json             # TypeScript configuration
│       ├── vite.config.ts            # Vite build configuration
│       ├── index.html                # HTML entry point
│       │
│       ├── src/                      # Source code (all TypeScript/React here)
│       │   ├── main.tsx              # Application entry point (ReactDOM.render)
│       │   ├── App.tsx               # Root component, context providers
│       │   │
│       │   ├── contexts/             # React Context (global state)
│       │   │   ├── AuthContext.tsx   # User, permissions, loading state
│       │   │   └── SettingsContext.tsx # dateT, dateTMinus1, environment
│       │   │
│       │   ├── hooks/                # Custom React hooks
│       │   │   ├── useAuth.ts        # Hook to consume AuthContext
│       │   │   └── useSettings.ts    # Hook to consume SettingsContext
│       │   │
│       │   ├── services/             # API calls (fetch wrappers)
│       │   │   ├── api.ts            # Base API client (error handling, JSON parsing)
│       │   │   ├── auth.ts           # Auth API calls (fetchUserPermissions)
│       │   │   └── rad.ts            # RAD API calls (fetchRADData, submitRADForm)
│       │   │
│       │   ├── types/                # TypeScript type definitions
│       │   │   ├── auth.ts           # User, Permissions, Role types
│       │   │   ├── permissions.ts    # Permission-related types
│       │   │   ├── api.ts            # ApiResponse<T>, ApiError types
│       │   │   └── rad.ts            # RAD data types
│       │   │
│       │   ├── components/           # React UI components
│       │   │   ├── NavigatorBar.tsx  # Top navigation (tab buttons)
│       │   │   ├── MainArea.tsx      # Main content area (tab router)
│       │   │   │
│       │   │   ├── settings/         # Settings tab
│       │   │   │   ├── Settings.tsx
│       │   │   │   └── Settings.module.css
│       │   │   │
│       │   │   ├── dd/               # Derivative Desk tab
│       │   │   │   ├── DD.tsx
│       │   │   │   ├── DD.module.css
│       │   │   │   ├── publisher/
│       │   │   │   │   ├── Publisher.tsx      # Link-based tool
│       │   │   │   │   └── Publisher.module.css
│       │   │   │   ├── aggregator/
│       │   │   │   │   ├── Aggregator.tsx     # Link-based tool
│       │   │   │   │   └── Aggregator.module.css
│       │   │   │   └── sodrisk/
│       │   │   │       ├── Sodrisk.tsx
│       │   │   │       └── Sodrisk.module.css
│       │   │   │
│       │   │   ├── rad/              # RAD tab
│       │   │   │   ├── RAD.tsx
│       │   │   │   ├── RAD.module.css
│       │   │   │   └── rpm/
│       │   │   │       ├── RPM.tsx            # Data fetching + form tool
│       │   │   │       └── RPM.module.css
│       │   │   │
│       │   │   ├── exotics/          # Exotics tab
│       │   │   │   ├── Exotics.tsx
│       │   │   │   ├── Exotics.module.css
│       │   │   │   └── rpm/
│       │   │   │       ├── RPM.tsx
│       │   │   │       └── RPM.module.css
│       │   │   │
│       │   │   ├── ldfx/             # LDFX tab
│       │   │   │   ├── LDFX.tsx
│       │   │   │   ├── LDFX.module.css
│       │   │   │   └── rpm/
│       │   │   │       ├── RPM.tsx
│       │   │   │       └── RPM.module.css
│       │   │   │
│       │   │   ├── fxg/              # FXG tab
│       │   │   │   ├── FXG.tsx
│       │   │   │   ├── FXG.module.css
│       │   │   │   └── rpm/
│       │   │   │       ├── RPM.tsx
│       │   │   │       └── RPM.module.css
│       │   │   │
│       │   │   ├── options/          # Options tab
│       │   │   │   ├── Options.tsx
│       │   │   │   ├── Options.module.css
│       │   │   │   └── rpm/
│       │   │   │       ├── RPM.tsx
│       │   │   │       └── RPM.module.css
│       │   │   │
│       │   │   └── inflation/        # Inflation tab
│       │   │       ├── Inflation.tsx
│       │   │       ├── Inflation.module.css
│       │   │       └── rpm/
│       │   │           ├── RPM.tsx
│       │   │           └── RPM.module.css
│       │   │
│       │   └── styles/               # Global styles
│       │       └── global.css        # Global CSS (resets, typography, etc.)
│       │
│       ├── public/                   # Static assets (not processed by Vite)
│       │   └── favicon.ico           # Browser tab icon
│       │
│       └── dist/                     # Build output (generated, git ignored)
│           ├── index.html
│           ├── assets/
│           └── ...
│
├── scripts/                          # Utility scripts
│   ├── run_dev.sh                    # Run both frontend and backend dev servers
│   └── setup_dev.sh                  # Initial setup (install dependencies)
│
├── .gitignore                        # Git ignore rules (node_modules, dist, etc.)
├── .env.example                      # Example environment variables
└── README.md                         # Project overview, setup instructions
```

---

## Folder Purposes

### Root Level

| Folder/File | Purpose | Notes |
|-------------|---------|-------|
| `.claude/` | Claude Code configuration | Optional, created by `claude init` |
| `.git/` | Git repository data | Version control |
| `docs/` | Documentation | Markdown files for architecture, guides |
| `apps/` | Application code | Frontend + Backend |
| `scripts/` | Utility scripts | Bash scripts for development tasks |
| `.gitignore` | Git ignore rules | Prevent committing build artifacts, secrets |
| `.env.example` | Example env vars | Template for local `.env` (not committed) |
| `README.md` | Project overview | First file developers read |

### Backend (`apps/api/`)

| Folder/File | Purpose | What Goes Here |
|-------------|---------|----------------|
| `server.py` | Entry point | Route definitions, app startup |
| `requirements.txt` | Python dependencies | `tornado`, `pywin32`, etc. |
| `auth/` | Authentication & authorization | Role definitions, permission logic, decorators |
| `handlers/` | API endpoint handlers | Tornado RequestHandler classes |
| `datastore/` | Data storage | Database models, query logic |
| `utils/` | Helper functions | Reusable utility functions |

**Backend file naming:**
- Python modules: `lowercase_with_underscores.py`
- Classes: `PascalCase` (e.g., `PermissionsHandler`)
- Functions: `snake_case` (e.g., `get_user_permissions()`)

### Frontend (`apps/web/src/`)

| Folder/File | Purpose | What Goes Here |
|-------------|---------|----------------|
| `main.tsx` | Entry point | `ReactDOM.render()` call |
| `App.tsx` | Root component | Context providers, top-level layout |
| `contexts/` | Global state | React Context providers |
| `hooks/` | Custom hooks | Reusable logic (`useAuth`, `useSettings`) |
| `services/` | API calls | Fetch wrappers, API clients |
| `types/` | TypeScript types | Shared type definitions |
| `components/` | React components | UI components (tabs, tools) |
| `styles/` | Global CSS | Shared styles, CSS variables |

**Frontend file naming:**
- Components: `PascalCase.tsx` (e.g., `NavigatorBar.tsx`)
- Hooks: `camelCase.ts`, starts with `use` (e.g., `useAuth.ts`)
- Services: `camelCase.ts` (e.g., `auth.ts`, `rad.ts`)
- Types: `camelCase.ts` (e.g., `permissions.ts`)
- CSS Modules: `PascalCase.module.css` (matches component name)

---

## File Naming Conventions

### Frontend (TypeScript/React)

| File Type | Convention | Example |
|-----------|------------|---------|
| React Component | PascalCase.tsx | `NavigatorBar.tsx`, `Settings.tsx` |
| CSS Module | PascalCase.module.css | `NavigatorBar.module.css` |
| Custom Hook | camelCase.ts, starts with `use` | `useAuth.ts`, `useSettings.ts` |
| Service | camelCase.ts | `api.ts`, `auth.ts`, `rad.ts` |
| Type Definition | camelCase.ts | `auth.ts`, `permissions.ts` |
| Utility | camelCase.ts | `formatDate.ts`, `validation.ts` |
| Test | Same as file + `.test.tsx` | `NavigatorBar.test.tsx` |

### Backend (Python)

| File Type | Convention | Example |
|-----------|------------|---------|
| Module | snake_case.py | `access_control.py`, `auth_helpers.py` |
| Handler | snake_case.py | `permissions.py`, `rad.py` |
| Class | PascalCase | `PermissionsHandler`, `BaseHandler` |
| Function | snake_case | `get_user_permissions`, `check_permissions` |
| Constant | UPPER_SNAKE_CASE | `ALL_TABS`, `USER_ROLES` |
| Test | `test_*.py` | `test_permissions.py` |

---

## Import Path Examples

### Frontend Imports

**Absolute imports (from `src/`):**
```typescript
// Components
import NavigatorBar from 'components/NavigatorBar';
import Settings from 'components/settings/Settings';

// Contexts
import { AuthProvider } from 'contexts/AuthContext';
import { SettingsProvider } from 'contexts/SettingsContext';

// Hooks
import { useAuth } from 'hooks/useAuth';
import { useSettings } from 'hooks/useSettings';

// Services
import { fetchUserPermissions } from 'services/auth';
import { fetchRADData } from 'services/rad';

// Types
import type { User, Permissions } from 'types/auth';
import type { ApiResponse } from 'types/api';

// Styles
import 'styles/global.css';
import styles from './Settings.module.css';
```

**Relative imports (within same folder):**
```typescript
// In DD.tsx
import Publisher from './publisher/Publisher';
import Aggregator from './aggregator/Aggregator';
```

### Backend Imports

```python
# From other modules
from auth.main import get_user_permissions
from auth.decorators import requires_permissions
from handlers.base import BaseHandler
from datastore.hydrastore import HydraStore

# From same module
from .access_control import USER_ROLES, ROLES_PERMISSIONS
```

---

## Git Ignore Rules

**.gitignore contents:**
```gitignore
# Node (Frontend)
node_modules/
dist/
*.log
npm-debug.log*

# Python (Backend)
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
env/

# IDEs
.vscode/
.idea/
*.swp
*.swo

# Environment
.env
.env.local

# OS
.DS_Store
Thumbs.db

# Build artifacts
build/
*.egg-info/

# Testing
coverage/
.pytest_cache/
```

---

## File Size Guidelines

| File Type | Ideal Size | Max Size | Notes |
|-----------|------------|----------|-------|
| React Component | 50-150 lines | 300 lines | Split into sub-components if larger |
| Service File | 20-100 lines | 200 lines | One service per domain (e.g., `rad.ts`) |
| Handler (Python) | 30-100 lines | 200 lines | One handler class per endpoint group |
| CSS Module | 20-80 lines | 150 lines | Split into multiple files if needed |
| Type Definition | 10-50 lines | 100 lines | Group related types |

**Rule of thumb:** If a file exceeds max size, refactor into smaller files.

---

## Common File Locations (Quick Reference)

### "Where do I put...?"

| What | Where | Example |
|------|-------|---------|
| **New React component** | `src/components/{tab}/{tool}/` | `src/components/dd/publisher/Publisher.tsx` |
| **Global state (Context)** | `src/contexts/` | `src/contexts/AuthContext.tsx` |
| **Custom hook** | `src/hooks/` | `src/hooks/useAuth.ts` |
| **API call function** | `src/services/` | `src/services/rad.ts` → `fetchRADData()` |
| **TypeScript type** | `src/types/` | `src/types/auth.ts` → `interface User` |
| **Global CSS** | `src/styles/global.css` | CSS variables, resets |
| **Component CSS** | Next to component, `.module.css` | `src/components/dd/DD.module.css` |
| **Backend endpoint** | `apps/api/handlers/` | `apps/api/handlers/rad.py` |
| **Auth logic** | `apps/api/auth/` | `apps/api/auth/decorators.py` |
| **Database query** | `apps/api/datastore/` | `apps/api/datastore/hydrastore.py` |
| **Utility function (FE)** | `src/utils/` (create if needed) | `src/utils/formatDate.ts` |
| **Utility function (BE)** | `apps/api/utils/` | `apps/api/utils/auth_helpers.py` |
| **Documentation** | `docs/` | `docs/architecture.md` |
| **Script** | `scripts/` | `scripts/run_dev.sh` |

---

## Special Files

### Configuration Files

| File | Purpose | When to Edit |
|------|---------|--------------|
| `package.json` | Frontend dependencies | Adding npm packages |
| `tsconfig.json` | TypeScript compiler config | Changing module resolution, strict mode |
| `vite.config.ts` | Vite build config | Adding plugins, proxy rules |
| `requirements.txt` | Backend dependencies | Adding Python packages |
| `.env.example` | Example environment vars | Adding new config options |
| `.gitignore` | Git ignore rules | Excluding new file types |

### Entry Points

| File | Purpose | What It Does |
|------|---------|--------------|
| `apps/web/index.html` | Frontend HTML entry | Loads `main.tsx`, defines `#root` |
| `apps/web/src/main.tsx` | Frontend JS entry | Renders `<App />` to DOM |
| `apps/api/server.py` | Backend entry | Starts Tornado server, defines routes |

---

## Tree Navigation Tips

### Finding Files Quickly

**By feature/domain:**
```bash
# Everything related to RAD
apps/web/src/components/rad/
apps/web/src/services/rad.ts
apps/web/src/types/rad.ts
apps/api/handlers/rad.py

# Everything related to auth
apps/web/src/contexts/AuthContext.tsx
apps/web/src/hooks/useAuth.ts
apps/web/src/services/auth.ts
apps/web/src/types/auth.ts
apps/api/auth/
```

**By layer:**
```bash
# All React components (UI layer)
apps/web/src/components/

# All API calls (service layer)
apps/web/src/services/

# All backend endpoints (API layer)
apps/api/handlers/
```

### VS Code Tips

**Open file by name:** `Cmd+P` (Mac) or `Ctrl+P` (Windows)
```
Type: "NavigatorBar" → Opens NavigatorBar.tsx
Type: "auth.ts" → Shows all files named auth.ts
```

**Search in files:** `Cmd+Shift+F` (Mac) or `Ctrl+Shift+F` (Windows)
```
Search: "useAuth" → Finds all usages
Search: "@requires_permissions" → Finds protected endpoints
```

---

## Future Structure Changes

### After Phase 2 (Contexts)
```
src/
├── contexts/       ← NEW
├── hooks/          ← NEW
└── ...
```

### After Phase 4 (API Service Layer)
```
src/
├── services/       ← NEW
├── types/          ← NEW (moved from inline types)
└── ...
```

### After Phase 5 (Backend Refactor)
```
apps/api/
├── handlers/       ← NEW
├── auth/decorators.py  ← NEW
└── ...
```

### Production (Post-MVP)
```
/workspaces/dashboard/
├── tests/          ← NEW
│   ├── frontend/
│   └── backend/
├── .github/        ← NEW
│   └── workflows/
├── docker/         ← NEW
│   ├── Dockerfile.api
│   └── Dockerfile.web
└── ...
```

---

**Last Updated:** Phase 1
**Total Files:** ~60 (after all phases complete)
**Total Lines of Code:** ~3,000-4,000 (estimated)
