# Development Guide

## Quick Start

### First Time Setup
```bash
# 1. Navigate to project root
cd /workspaces/dashboard

# 2. Install frontend dependencies
cd apps/web
npm install

# 3. Install backend dependencies
cd ../api
pip install -r requirements.txt

# 4. Return to root
cd ../..
```

### Running Development Servers

**Option 1: Run both servers with one command (Recommended)**
```bash
./scripts/run_dev.sh
```

**Option 2: Run servers separately**

Terminal 1 (Frontend):
```bash
cd apps/web
npm run dev
```

Terminal 2 (Backend):
```bash
cd apps/api
python server.py
```

### Accessing the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8888
- **API Docs:** http://localhost:8888 (health check)

---

## Development Workflow

### Daily Development Loop

1. **Start servers** (see above)
2. **Make changes** in your editor
3. **See changes instantly** (Vite hot reload)
4. **Test in browser** (http://localhost:5173)
5. **Check console** for errors (browser DevTools + terminal)
6. **Commit when done** (see Git Workflow below)

### Git Workflow

#### Creating a Feature Branch
```bash
# 1. Ensure you're on main branch
git checkout main

# 2. Pull latest changes
git pull origin main

# 3. Create feature branch (use descriptive name)
git checkout -b feature/add-rad-tool
# or
git checkout -b fix/permissions-bug
# or
git checkout -b phase-2-react-contexts
```

#### Making Changes
```bash
# 1. Check what changed
git status

# 2. Review your changes
git diff

# 3. Stage specific files
git add apps/web/src/components/rad/RAD.tsx
git add apps/api/handlers/rad.py

# Or stage all changes
git add .
```

#### Committing Changes
```bash
# Commit with descriptive message
git commit -m "Add RAD data fetching and form submission

- Create RAD API endpoints (GET /api/rad/data, POST /api/rad/submit)
- Add permission decorator (@requires_permissions)
- Implement RAD service layer (fetchRADData, submitRADForm)
- Update RAD component with loading/error states
- Add form validation

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

**Commit Message Format:**
```
<Title: Brief summary (50 chars or less)>

<Body: Detailed explanation (optional)>
- Bullet points for key changes
- What was added/changed/fixed
- Why (if not obvious)

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

#### Pushing to Remote
```bash
# First time pushing a new branch
git push -u origin feature/add-rad-tool

# Subsequent pushes (after first time)
git push
```

#### Creating a Pull Request (PR)

**Option 1: GitHub CLI (if installed)**
```bash
gh pr create --title "Add RAD tool with data fetching" --body "
## Summary
- Implements RAD data fetching from backend
- Adds form submission for RAD parameters
- Includes loading and error states

## Test Plan
- [ ] RAD tab loads data on mount
- [ ] Table displays RAD data correctly
- [ ] Form submission works
- [ ] Error handling displays messages
- [ ] Loading spinner shows during fetch

## Screenshots
(Optional: attach screenshots)
"
```

**Option 2: GitHub Web UI**
1. Go to https://github.com/your-org/dashboard
2. Click "Pull requests" → "New pull request"
3. Select your branch
4. Fill in title and description
5. Click "Create pull request"

#### PR Review Checklist

Before requesting review, ensure:
- [ ] Code runs without errors
- [ ] No console errors in browser DevTools
- [ ] Changes match requirements
- [ ] Removed debug console.log() statements
- [ ] Updated documentation if needed
- [ ] No secrets committed (.env files)
- [ ] TypeScript has no type errors (`npm run build` passes)

#### Merging Pull Request

After approval:
```bash
# Option 1: Merge via GitHub UI (recommended)
# Click "Merge pull request" button

# Option 2: Merge via command line
git checkout main
git merge feature/add-rad-tool
git push origin main
```

#### Cleanup After Merge
```bash
# Delete local branch
git branch -d feature/add-rad-tool

# Delete remote branch
git push origin --delete feature/add-rad-tool
```

---

## Common Commands

### Frontend (npm)

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install new package
npm install <package-name>

# Install dev dependency
npm install --save-dev <package-name>

# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Fix linting issues
npm run lint --fix  # (if lint script configured)
```

### Backend (Python)

```bash
# Start server
python server.py

# Install new package
pip install <package-name>

# Update requirements.txt
pip freeze > requirements.txt

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # Mac/Linux
# or
venv\Scripts\activate  # Windows

# Install from requirements.txt
pip install -r requirements.txt
```

### Git

```bash
# Check status
git status

# View changes
git diff

# View commit history
git log --oneline

# Create and switch to new branch
git checkout -b branch-name

# Switch to existing branch
git checkout branch-name

# List all branches
git branch -a

# Delete branch
git branch -d branch-name

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard all local changes
git reset --hard

# Stash changes (save for later)
git stash
git stash pop  # Restore stashed changes

# Pull latest from remote
git pull origin main

# Push to remote
git push origin branch-name
```

---

## File Operations

### Creating New Files

**Frontend Component:**
```bash
# Create component folder
mkdir -p apps/web/src/components/newtab/newtool

# Create component file
touch apps/web/src/components/newtab/newtool/NewTool.tsx

# Create CSS file
touch apps/web/src/components/newtab/newtool/NewTool.module.css
```

**Backend Handler:**
```bash
# Create handler file
touch apps/api/handlers/newtab.py
```

**Service Layer:**
```bash
# Create service file
touch apps/web/src/services/newtab.ts

# Create types file
touch apps/web/src/types/newtab.ts
```

### Component Template

**React Component (apps/web/src/components/example/Example.tsx):**
```typescript
import React from 'react';
import styles from './Example.module.css';
import { useAuth } from 'hooks/useAuth';

interface ExampleProps {
  title: string;
}

const Example: React.FC<ExampleProps> = ({ title }) => {
  const { permissions } = useAuth();

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      {/* Component content */}
    </div>
  );
};

export default Example;
```

**Tornado Handler (apps/api/handlers/example.py):**
```python
import json
from .base import BaseHandler
from auth.decorators import requires_permissions

class ExampleDataHandler(BaseHandler):
    @requires_permissions(tab='example', tool='tool_name')
    def get(self):
        """Fetch example data"""
        user_id = self.get_current_user()
        data = {'message': 'Hello from example endpoint'}
        self.write(json.dumps(data))

    @requires_permissions(tab='example', tool='tool_name')
    def post(self):
        """Submit example form"""
        user_id = self.get_current_user()
        body = json.loads(self.request.body)
        # Process data
        self.write(json.dumps({'success': True}))
```

---

## Debugging

### Frontend Debugging

**Browser DevTools:**
```
1. Open browser DevTools (F12 or Cmd+Opt+I)
2. Console tab → See console.log() output and errors
3. Network tab → See API requests/responses
4. React DevTools → Inspect component state
```

**Adding Debug Logs:**
```typescript
// In component
console.log('User permissions:', permissions);
console.log('Form data:', formData);

// In service
console.log('API request:', endpoint, options);
console.log('API response:', data);
```

**React DevTools:**
```
1. Install React DevTools extension
2. Open DevTools → "Components" tab
3. Inspect: AuthProvider → See auth state
4. Inspect: SettingsProvider → See settings state
```

### Backend Debugging

**Server Logs:**
```bash
# Tornado logs appear in terminal
# Look for:
INFO:root:Server started at http://127.0.0.1:8888
ERROR:tornado.application:Uncaught exception...
```

**Adding Debug Logs:**
```python
import logging

# In handler
logging.info(f"User {user_id} requested permissions")
logging.debug(f"Permissions data: {permissions}")
logging.error(f"Error fetching data: {e}")
```

**Testing Endpoints:**
```bash
# Using curl
curl http://localhost:8888/api/user/permissions

# Using httpie (if installed)
http GET localhost:8888/api/user/permissions

# POST request
curl -X POST http://localhost:8888/api/rad/submit \
  -H "Content-Type: application/json" \
  -d '{"param": "value"}'
```

---

## Troubleshooting

### Common Issues

#### Frontend won't start

**Error:** `ENOENT: no such file or directory`
```bash
# Solution: Install dependencies
cd apps/web
npm install
```

**Error:** `Port 5173 already in use`
```bash
# Solution: Kill process using port
lsof -ti:5173 | xargs kill -9  # Mac/Linux
# or change port in vite.config.ts
```

**Error:** `Module not found: Can't resolve 'components/...'`
```bash
# Solution: Check import path
# Use absolute imports from src/
import NavigatorBar from 'components/NavigatorBar';
# NOT: import NavigatorBar from '../components/NavigatorBar';
```

#### Backend won't start

**Error:** `ModuleNotFoundError: No module named 'tornado'`
```bash
# Solution: Install dependencies
pip install -r requirements.txt
```

**Error:** `Address already in use`
```bash
# Solution: Kill process using port 8888
lsof -ti:8888 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :8888  # Windows (then kill PID)
```

**Error:** `ImportError: attempted relative import with no known parent package`
```bash
# Solution: Add __init__.py files to make proper modules
touch apps/api/auth/__init__.py
touch apps/api/handlers/__init__.py
```

#### API requests failing

**Error:** `Failed to fetch` in browser console
```bash
# Solution: Ensure backend is running
cd apps/api
python server.py

# Check backend URL in services/api.ts
# Should be: http://localhost:8888
```

**Error:** `403 Forbidden` on API call
```bash
# Solution: Check permissions
# User needs permission for that tab/tool
# Edit apps/api/auth/access_control.py
```

**Error:** `CORS error`
```bash
# Solution: Add CORS headers in Tornado
# (Will be added in production setup)
```

#### Git issues

**Error:** `Your branch is behind`
```bash
# Solution: Pull latest changes
git pull origin main
```

**Error:** `Merge conflict`
```bash
# Solution: Resolve conflicts manually
# 1. Open conflicted files
# 2. Look for <<<<<<< HEAD markers
# 3. Choose which version to keep
# 4. Remove conflict markers
# 5. git add <file>
# 6. git commit
```

**Error:** `Permission denied (publickey)`
```bash
# Solution: Set up SSH key
# Follow: https://docs.github.com/en/authentication
```

---

## Testing

### Manual Testing Checklist

**Before committing:**
- [ ] Frontend starts without errors (`npm run dev`)
- [ ] Backend starts without errors (`python server.py`)
- [ ] App loads in browser (http://localhost:5173)
- [ ] No errors in browser console (F12 → Console)
- [ ] Changed functionality works as expected
- [ ] Existing functionality still works (regression test)
- [ ] TypeScript compiles without errors (`npm run build`)

**Testing a new component:**
- [ ] Component renders without errors
- [ ] Props are passed correctly
- [ ] Context data is accessed correctly
- [ ] Styles are applied
- [ ] Responsive design works (resize browser)

**Testing a new API endpoint:**
- [ ] Endpoint returns expected data
- [ ] Error handling works (test with invalid input)
- [ ] Permissions are checked (test with different users)
- [ ] Logs show in terminal

### Automated Testing (Future)

```bash
# Frontend tests (Jest + React Testing Library)
npm test

# Backend tests (pytest)
pytest

# E2E tests (Playwright)
npx playwright test
```

---

## Code Style Guidelines

### TypeScript/React

**Naming:**
- Components: `PascalCase` (NavigatorBar, Settings)
- Functions: `camelCase` (fetchUserPermissions, handleSubmit)
- Constants: `UPPER_SNAKE_CASE` (API_BASE_URL)
- Types/Interfaces: `PascalCase` (User, Permissions)

**Imports Order:**
```typescript
// 1. React
import React, { useState, useEffect } from 'react';

// 2. External libraries
import axios from 'axios';

// 3. Internal - contexts/hooks
import { useAuth } from 'hooks/useAuth';

// 4. Internal - components
import NavigatorBar from 'components/NavigatorBar';

// 5. Internal - services/utils
import { fetchData } from 'services/api';

// 6. Styles
import styles from './Component.module.css';
```

**Component Structure:**
```typescript
// 1. Imports
import React from 'react';

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
}

// 3. Component
const Component: React.FC<ComponentProps> = ({ title }) => {
  // 3a. Hooks
  const { user } = useAuth();
  const [data, setData] = useState([]);

  // 3b. Effects
  useEffect(() => {
    // ...
  }, []);

  // 3c. Event handlers
  const handleClick = () => {
    // ...
  };

  // 3d. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

// 4. Export
export default Component;
```

### Python

**Naming:**
- Modules: `snake_case` (access_control.py)
- Classes: `PascalCase` (PermissionsHandler)
- Functions: `snake_case` (get_user_permissions)
- Constants: `UPPER_SNAKE_CASE` (ALL_TABS, USER_ROLES)

**Imports Order:**
```python
# 1. Standard library
import json
import logging

# 2. Third-party
import tornado.web

# 3. Local - relative imports
from .base import BaseHandler
from auth.main import get_user_permissions
```

**Docstrings:**
```python
def get_user_permissions(user_id: str) -> dict:
    """
    Get permissions for a user based on their roles.

    Args:
        user_id: The user's ID

    Returns:
        Dictionary with 'tabs' and tool permissions
    """
    # Implementation
```

---

## Environment Variables

### Frontend (.env)

**Create:** `apps/web/.env.local`
```env
VITE_API_BASE_URL=http://localhost:8888
VITE_ENVIRONMENT=development
```

**Usage in code:**
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

### Backend (.env)

**Create:** `apps/api/.env`
```env
PORT=8888
ENVIRONMENT=development
LOG_LEVEL=INFO
```

**Usage in code:**
```python
import os
port = os.getenv('PORT', 8888)
```

**IMPORTANT:** Never commit `.env` files! They're in `.gitignore`.

---

## Performance Tips

### Frontend

**Lazy Loading:**
```typescript
// Load components only when needed
const RAD = React.lazy(() => import('components/rad/RAD'));
```

**Memoization:**
```typescript
// Prevent unnecessary re-renders
const MemoizedComponent = React.memo(Component);
```

**useCallback:**
```typescript
// Prevent function recreation
const handleClick = useCallback(() => {
  // handler
}, [dependencies]);
```

### Backend

**Async Handlers:**
```python
# Use async/await for I/O operations
class AsyncHandler(BaseHandler):
    async def get(self):
        data = await fetch_from_database()
        self.write(json.dumps(data))
```

---

## Documentation Updates

**When to update docs:**
- Added new feature → Update implementation-plan.md
- Changed architecture → Update architecture.md
- Changed file structure → Update file-structure.md
- Added new workflow → Update development-guide.md (this file)
- Changed setup → Update README.md

**Keep docs in sync with code!**

---

## Getting Help

1. **Check documentation:**
   - `docs/implementation-plan.md` - What to build
   - `docs/architecture.md` - Why it's built this way
   - `docs/file-structure.md` - Where things are
   - `docs/development-guide.md` - How to build (this file)

2. **Check console for errors:**
   - Browser DevTools (F12) → Console tab
   - Terminal where servers are running

3. **Search in code:**
   - VS Code: Cmd+Shift+F (Mac) or Ctrl+Shift+F (Windows)
   - Search for similar code/patterns

4. **Ask Claude Code:**
   - Use Claude Code for debugging help
   - Ask: "Why is this component not rendering?"
   - Ask: "How do I add a new endpoint?"

---

**Last Updated:** Phase 1
**Next Review:** After Phase 4 (API Service Layer)
