# Dashboard Implementation Plan

## Overview
This document tracks the 8-phase implementation plan for the Dashboard application. Check off tasks as you complete them.

**Total Duration:** ~7 days
**Current Phase:** Phase 5 ✓ (5/8 phases complete - 63% done)

---

## Phase 1: Setup Build Tooling & Structure ✓
**Duration:** 1 day
**Status:** ✅ COMPLETED

### Tasks
- [x] Delete existing `apps/web/` for clean slate
- [x] Create documentation files (this file + 3 others)
- [x] Create `package.json` with React, TypeScript, Vite dependencies
- [x] Create `tsconfig.json` (TypeScript configuration)
- [x] Create `vite.config.ts` (Vite configuration with backend proxy)
- [x] Create `index.html` (entry point)
- [x] Create `src/` folder structure
- [x] Create all base components (Navigator, MainArea, Settings, Tabs)
- [x] Create dev scripts (`scripts/run_dev.sh`)
- [x] Update `.gitignore`
- [x] Update `README.md`

### Validation
```bash
cd apps/web
npm install          # Should install without errors
npm run dev          # Should start dev server on http://localhost:5173
```

### Git Workflow
```bash
git checkout -b phase-1-vite-setup
git add .
git commit -m "Phase 1: Setup Vite build system and restructure frontend"
git push origin phase-1-vite-setup
# Create PR to main
```

---

## Phase 2: Create Contexts & Hooks ✓
**Duration:** 1 day
**Status:** ✅ COMPLETED

### Tasks
- [x] Create `src/contexts/AuthContext.tsx`
  - User state (id, name, roles)
  - Permissions state (tabs, tool permissions)
  - Loading and error states
  - `fetchPermissions()` function
- [x] Create `src/contexts/SettingsContext.tsx`
  - dateT, dateTMinus1, environment states
  - Setter functions for each
- [x] Create `src/hooks/useAuth.ts`
  - Custom hook to consume AuthContext
  - Type-safe access to auth state
- [x] Create `src/hooks/useSettings.ts`
  - Custom hook to consume SettingsContext
  - Type-safe access to settings state
- [x] Create `src/types/auth.ts`
  - TypeScript interfaces for User, Permissions, etc.
- [x] Create `src/types/settings.ts`
  - TypeScript interfaces for Settings
- [x] Update `src/App.tsx`
  - Wrap with `<AuthProvider>` and `<SettingsProvider>`
  - Remove local state (now in contexts)
- [x] Test contexts in browser DevTools

### Validation
- Open React DevTools → Components → See AuthProvider and SettingsProvider
- Change settings values → Verify shared across components
- Check permissions → Verify tabs/tools render correctly

### Git Workflow
```bash
git checkout -b phase-2-react-contexts
# ... make changes ...
git add .
git commit -m "Phase 2: Add React Context for auth and settings"
git push origin phase-2-react-contexts
# Create PR to main
```

---

## Phase 3: Refactor Components to Use Contexts ✓
**Duration:** 1-2 days
**Status:** ✅ COMPLETED

### Tasks
- [x] Update `NavigatorBar.tsx`
  - Remove props, use `useAuth()` hook
  - Get permissions.tabs from context
- [x] Update `MainArea.tsx`
  - Remove permissions prop
  - Use `useAuth()` hook to get permissions
- [x] Update `Settings.tsx`
  - Remove local state
  - Use `useSettings()` hook for dateT, dateTMinus1, environment
  - Changes now global across app
- [x] Update `DD.tsx` (and all tab components)
  - Remove permissions prop
  - Use `useAuth()` hook to get tool permissions
- [x] Update `RAD.tsx`, `Exotics.tsx`, `LDFX.tsx`, `FXG.tsx`, `Options.tsx`, `Inflation.tsx`
  - Same pattern as DD.tsx
  - Use context instead of props
- [x] Remove all permission-related props from component interfaces
- [x] Update `App.tsx` to remove permission prop passing
- [x] Test: No prop drilling, all data flows through contexts

### Validation
- No props being passed for permissions or settings
- All components get data from contexts
- Settings changes in Settings tab visible in other tabs
- Permissions still control tab/tool visibility

### Git Workflow
```bash
git checkout -b phase-3-use-contexts
# ... make changes ...
git add .
git commit -m "Phase 3: Refactor components to use React Context"
git push origin phase-3-use-contexts
# Create PR to main
```

---

## Phase 4: API Service Layer ✓
**Duration:** 1 day
**Status:** ✅ COMPLETED

### Tasks
- [x] Create `src/services/api.ts`
  - Base `apiClient()` function
  - Wraps fetch with error handling
  - JSON parsing
  - Status code checks (401, 403, 500)
  - Helper functions: `get()`, `post()`, `put()`, `del()`
  - `ApiClientError` class for errors
  - `formatApiError()` for user-friendly messages
- [x] Create `src/services/auth.ts`
  - `fetchUserPermissions()` function
  - Uses `apiClient()` internally
- [x] Create `src/types/api.ts`
  - `ApiResponse<T>` type
  - `ApiError` type
  - `PaginatedResponse<T>` type
  - `LoadingState<T>` type
- [x] Update `AuthContext.tsx`
  - Use `auth.fetchUserPermissions()` instead of direct fetch
  - Handle errors properly with `formatApiError()`
  - Show loading states
- [x] Test error handling
  - Simulate 401, 500 errors
  - Verify error messages display
  - Simulate 401, 500 errors
  - Verify error messages display

### Validation
- Stop backend → Frontend shows error message
- Start backend → App recovers
- No direct `fetch()` calls in components (only in services)

### Git Workflow
```bash
git checkout -b phase-4-api-service-layer
# ... make changes ...
git add .
git commit -m "Phase 4: Add API service layer with error handling"
git push origin phase-4-api-service-layer
# Create PR to main
```

---

## Phase 5: Backend Refactoring ✓
**Duration:** 1 day
**Status:** ✅ COMPLETED

### Tasks
- [x] Create `apps/api/auth/__init__.py` (make proper module)
- [x] Create `apps/api/datastore/__init__.py` (make proper module)
- [x] Create `apps/api/utils/__init__.py` (make proper module)
- [x] Create `apps/api/auth/decorators.py`
  - `@requires_permissions(tab='dd', tool='publisher')` decorator
  - `@requires_any_permission()` decorator for flexible checking
  - Checks user permissions before handler runs
  - Returns 401 (Unauthorized) or 403 (Forbidden)
- [x] Create `apps/api/handlers/` directory
- [x] Create `apps/api/handlers/__init__.py`
- [x] Create `apps/api/handlers/base.py`
  - `BaseHandler` class with common functionality
  - `get_current_user()` method (hardcoded for now, ready for production)
  - `write_json()` helper method
  - `write_error()` error handling
  - CORS headers for development
- [x] Create `apps/api/handlers/permissions.py`
  - Move `PermissionsHandler` from server.py
  - Inherits from `BaseHandler`
  - Uses `write_json()` helper
- [x] Update `apps/api/server.py`
  - Import handlers from `handlers/` module
  - Update route definitions
  - Remove old inline handler classes
  - MainHandler returns JSON health check
- [x] Test: Backend still works, permissions checked

### Validation
```bash
cd apps/api
python server.py  # Should start without errors
curl http://localhost:8888/api/user/permissions  # Should return permissions
```

### Git Workflow
```bash
git checkout -b phase-5-backend-refactor
# ... make changes ...
git add .
git commit -m "Phase 5: Refactor backend with handlers and decorators"
git push origin phase-5-backend-refactor
# Create PR to main
```

---

## Phase 6: First Real Tool - RAD
**Duration:** 1 day
**Status:** ⏳ PENDING

### Tasks
- [ ] Create `apps/api/handlers/rad.py`
  - `RADDataHandler` - GET endpoint for fetching RAD data
  - `RADSubmitHandler` - POST endpoint for submitting RAD form
  - Apply `@requires_permissions(tab='rad', tool='rpm')` decorator
- [ ] Update `apps/api/server.py`
  - Add routes: `/api/rad/data`, `/api/rad/submit`
- [ ] Create `apps/web/src/services/rad.ts`
  - `fetchRADData()` function
  - `submitRADForm(data)` function
- [ ] Create `apps/web/src/types/rad.ts`
  - TypeScript types for RAD data and form
- [ ] Update `apps/web/src/components/rad/rpm/RPM.tsx`
  - Add loading/error states
  - Fetch data on mount using `useEffect` + `fetchRADData()`
  - Display data in table
  - Add form for submission
  - Submit form using `submitRADForm()`
  - Show success/error messages
- [ ] Test full flow: fetch → display → submit → refresh

### Validation
- RAD tab loads data from backend
- Table displays data
- Form submission works
- Success message shows after submit
- Data refreshes after submission

### Git Workflow
```bash
git checkout -b phase-6-rad-tool
# ... make changes ...
git add .
git commit -m "Phase 6: Implement RAD tool with data fetching and forms"
git push origin phase-6-rad-tool
# Create PR to main
```

---

## Phase 7: Link-Based Tools
**Duration:** 0.5 day
**Status:** ⏳ PENDING

### Tasks
- [ ] Update `apps/web/src/components/dd/publisher/Publisher.tsx`
  - Simple link button component
  - Opens external URL in new tab
  - Example: Link to SharePoint, internal tool, etc.
- [ ] Update `apps/web/src/components/dd/aggregator/Aggregator.tsx`
  - Same pattern as Publisher
- [ ] Add external link icon (optional, for UX)
- [ ] Add CSS styling for link buttons
- [ ] Test: Links open in new tab

### Validation
- Click Publisher → Opens link in new tab
- Click Aggregator → Opens link in new tab
- Links work correctly

### Git Workflow
```bash
git checkout -b phase-7-link-tools
# ... make changes ...
git add .
git commit -m "Phase 7: Add link-based tools (Publisher, Aggregator)"
git push origin phase-7-link-tools
# Create PR to main
```

---

## Phase 8: Documentation & Scripts
**Duration:** 0.5 day
**Status:** ⏳ PENDING

### Tasks
- [ ] Create `scripts/setup_dev.sh`
  - Installs Python dependencies
  - Installs npm dependencies
  - Sets up environment
- [ ] Update `scripts/run_dev.sh`
  - Ensure it works correctly
  - Add color output for clarity
- [ ] Create `.env.example`
  - Document environment variables
  - Example values for development
- [ ] Update `docs/architecture.md`
  - Add production deployment section
  - Document Windows auth integration approach
- [ ] Update `docs/development-guide.md`
  - Add troubleshooting section
  - Common issues and solutions
- [ ] Update `README.md`
  - Complete installation instructions
  - Usage examples
  - Link to other docs
- [ ] Run `claude init` (optional)
  - Set up Claude Code project config
  - Add custom slash commands if desired

### Validation
- Fresh clone → Run `scripts/setup_dev.sh` → Everything installs
- Run `scripts/run_dev.sh` → Both servers start
- Read `README.md` → Clear instructions

### Git Workflow
```bash
git checkout -b phase-8-documentation
# ... make changes ...
git add .
git commit -m "Phase 8: Add setup scripts and comprehensive documentation"
git push origin phase-8-documentation
# Create PR to main
```

---

## Post-MVP: Production Readiness

### Future Enhancements (After Phase 8)
- [ ] Windows Authentication Integration
  - IIS reverse proxy setup
  - Read `X-User` header from request
  - Replace hardcoded user_id
- [ ] Real Database Integration
  - Replace in-memory HydraStore
  - PostgreSQL or SQL Server
  - Database migrations
- [ ] Testing
  - Frontend: Jest + React Testing Library
  - Backend: pytest
  - E2E: Playwright or Cypress
- [ ] Error Boundaries (React)
  - Catch component errors
  - Show fallback UI
- [ ] Logging & Monitoring
  - Frontend: Error tracking (Sentry)
  - Backend: Structured logging
  - Performance monitoring
- [ ] Performance Optimization
  - Code splitting (React.lazy)
  - Bundle size optimization
  - Caching strategies
- [ ] Deployment
  - Docker containers
  - CI/CD pipeline
  - Environment configs (dev, UAT, prod)

---

## Quick Reference

### Common Commands
```bash
# Start development servers
./scripts/run_dev.sh

# Or start separately:
# Frontend
cd apps/web && npm run dev

# Backend
cd apps/api && python server.py

# Install dependencies
cd apps/web && npm install
cd apps/api && pip install -r requirements.txt

# Build for production
cd apps/web && npm run build
```

### File Locations
- **Documentation:** `/workspaces/dashboard/docs/`
- **Frontend:** `/workspaces/dashboard/apps/web/src/`
- **Backend:** `/workspaces/dashboard/apps/api/`
- **Scripts:** `/workspaces/dashboard/scripts/`

### Need Help?
- Read `docs/development-guide.md` for detailed development instructions
- Read `docs/architecture.md` for architecture decisions
- Read `docs/file-structure.md` for complete file tree
