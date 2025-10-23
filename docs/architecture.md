# Dashboard Architecture Documentation

## Overview

This document explains the architectural decisions made for the Dashboard application, including the rationale behind technology choices and design patterns.

---

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Architecture Patterns](#architecture-patterns)
3. [Frontend Architecture](#frontend-architecture)
4. [Backend Architecture](#backend-architecture)
5. [Authentication & Authorization](#authentication--authorization)
6. [Data Flow](#data-flow)
7. [Design Decisions](#design-decisions)
8. [Production Considerations](#production-considerations)

---

## Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type safety, better developer experience
- **Vite** - Fast build tool, hot module replacement
- **CSS Modules** - Scoped styling, no conflicts

**Why React?**
- ✅ Component-based architecture (matches tab/tool structure)
- ✅ Large ecosystem and community
- ✅ Excellent TypeScript support
- ✅ React Context API for state management (no external deps needed)

**Why Vite?**
- ✅ Extremely fast hot reload (instant feedback)
- ✅ Zero config for React + TypeScript
- ✅ Modern ESM-based builds
- ✅ Better developer experience than Webpack

**Why TypeScript?**
- ✅ Catch bugs at compile time
- ✅ Better IDE autocomplete (VSCode)
- ✅ Self-documenting code (types as documentation)
- ✅ Safer refactoring

### Backend
- **Tornado** - Python async web framework
- **Python 3.x** - Language choice
- **In-memory storage (MVP)** - Will be replaced with real DB later

**Why Tornado?**
- ✅ Async/await support for scalability
- ✅ Lightweight, fast
- ✅ Good for internal tools (simple to deploy)
- ✅ Easy to integrate with Windows auth

### Development Tools
- **npm** - Package manager (most compatible with corporate environments)
- **Git** - Version control
- **Claude Code** - AI-assisted development

---

## Architecture Patterns

### Frontend Patterns

#### 1. Component Composition
```
App
├── AuthProvider (Context)
│   └── SettingsProvider (Context)
│       ├── NavigatorBar
│       └── MainArea
│           ├── Settings
│           ├── DD
│           │   ├── Publisher
│           │   ├── Aggregator
│           │   └── Sodrisk
│           ├── RAD
│           └── ... (other tabs)
```

**Benefits:**
- Clear hierarchy
- Easy to reason about
- Reusable components

#### 2. React Context for State Management
```typescript
// AuthContext provides user and permissions
const { user, permissions, loading } = useAuth();

// SettingsContext provides global settings
const { dateT, environment, setDateT } = useSettings();
```

**Why Context over Redux/Zustand?**
- ✅ Built into React (zero dependencies)
- ✅ Sufficient for 2-3 global states
- ✅ Simpler learning curve
- ✅ Less boilerplate
- ✅ Can always migrate to Redux later if needed

**When to use Context:**
- User authentication state
- Permissions (role-based access)
- Global UI settings (dateT, environment)

**When NOT to use Context:**
- Frequently changing data (use local state)
- Complex async state machines (use React Query)

#### 3. Custom Hooks Pattern
```typescript
// Encapsulate context consumption
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be within AuthProvider');
  return context;
};
```

**Benefits:**
- ✅ Type-safe context access
- ✅ Clear error messages if used incorrectly
- ✅ Reusable across components
- ✅ Easy to test

#### 4. Service Layer Pattern
```typescript
// services/api.ts - Base API client
export const apiClient = async (endpoint, options) => {
  // Error handling, JSON parsing, status checks
};

// services/auth.ts - Domain-specific API calls
export const fetchUserPermissions = () => apiClient('/api/user/permissions');
```

**Benefits:**
- ✅ Centralized error handling
- ✅ No scattered fetch() calls
- ✅ Easy to add retry logic, caching
- ✅ Testable in isolation

### Backend Patterns

#### 1. Handler-Based Architecture
```python
# handlers/base.py
class BaseHandler(tornado.web.RequestHandler):
    def get_current_user(self):
        # Read from header, session, cookie
        pass

# handlers/permissions.py
class PermissionsHandler(BaseHandler):
    def get(self):
        user_id = self.get_current_user()
        permissions = get_user_permissions(user_id)
        self.write(json.dumps(permissions))
```

**Benefits:**
- ✅ Reusable base class for common functionality
- ✅ Easy to add auth checks
- ✅ Clear separation of concerns

#### 2. Decorator Pattern for Authorization
```python
@requires_permissions(tab='dd', tool='publisher')
def post(self):
    # Only runs if user has permissions
    pass
```

**Benefits:**
- ✅ Declarative permission checks
- ✅ DRY (Don't Repeat Yourself)
- ✅ Easy to audit (grep for @requires_permissions)
- ✅ Consistent error responses (403 Forbidden)

#### 3. Role-Based Access Control (RBAC)
```python
# User → Roles → Permissions
USER_ROLES = {'user_a': ['admin']}
ROLES_PERMISSIONS = {'admin': {'tabs': [...], 'dd': [...]}}
```

**Benefits:**
- ✅ Flexible (add new roles without code changes)
- ✅ Scalable (supports multiple roles per user)
- ✅ Auditable (clear permission definitions)

**Why RBAC over ABAC (Attribute-Based)?**
- ✅ Simpler for internal tools
- ✅ Easier to reason about
- ✅ Sufficient for "desk access" use case

---

## Frontend Architecture

### File Structure
```
apps/web/src/
├── main.tsx              # Entry point (ReactDOM.render)
├── App.tsx               # Root component, context providers
├── contexts/             # Global state (React Context)
│   ├── AuthContext.tsx
│   └── SettingsContext.tsx
├── hooks/                # Custom hooks
│   ├── useAuth.ts
│   └── useSettings.ts
├── services/             # API calls
│   ├── api.ts
│   ├── auth.ts
│   └── rad.ts
├── types/                # TypeScript definitions
│   ├── auth.ts
│   ├── permissions.ts
│   └── api.ts
├── components/           # React components (UI)
│   ├── NavigatorBar.tsx
│   ├── MainArea.tsx
│   ├── settings/
│   ├── dd/
│   ├── rad/
│   └── ...
└── styles/               # CSS
    └── global.css
```

### Folder Conventions

| Folder | Purpose | Naming Convention |
|--------|---------|-------------------|
| `contexts/` | Global state providers | PascalCase, ends with "Context.tsx" |
| `hooks/` | Custom React hooks | camelCase, starts with "use" |
| `services/` | API calls, external integrations | camelCase, .ts files |
| `types/` | TypeScript type definitions | camelCase, .ts files |
| `components/` | React UI components | PascalCase, .tsx files |
| `styles/` | CSS files | kebab-case or PascalCase.module.css |

### Component Organization

**One component per file:**
```
dd/
├── DD.tsx              # Main DD component
├── DD.module.css       # DD styles
├── publisher/
│   ├── Publisher.tsx
│   └── Publisher.module.css
├── aggregator/
└── sodrisk/
```

**Benefits:**
- ✅ Easy to find files
- ✅ Clear ownership (one component = one file)
- ✅ Easier code review (smaller diffs)

---

## Backend Architecture

### File Structure
```
apps/api/
├── server.py             # Entry point, route definitions
├── requirements.txt      # Python dependencies
├── auth/
│   ├── __init__.py
│   ├── access_control.py  # Role/permission definitions
│   ├── main.py            # Permission logic
│   └── decorators.py      # @requires_permissions
├── handlers/
│   ├── __init__.py
│   ├── base.py            # BaseHandler
│   ├── permissions.py     # Permissions endpoint
│   └── rad.py             # RAD endpoints
├── datastore/
│   └── hydrastore.py      # Data storage (mock for now)
└── utils/
    └── auth_helpers.py    # Auth utility functions
```

### Handler Organization

**Grouping strategy:**
- **By domain:** `handlers/rad.py`, `handlers/dd.py`
- **Not by HTTP method:** Avoid `handlers/get.py`, `handlers/post.py`

**Example:**
```python
# handlers/rad.py - All RAD-related endpoints
class RADDataHandler(BaseHandler):
    @requires_permissions(tab='rad', tool='rpm')
    def get(self):
        # Fetch RAD data
        pass

class RADSubmitHandler(BaseHandler):
    @requires_permissions(tab='rad', tool='rpm')
    def post(self):
        # Submit RAD form
        pass
```

---

## Authentication & Authorization

### Current State (MVP)
```python
# server.py
user_id = 'user_a'  # Hardcoded for development
```

### Production State (After Deployment)

#### Option 1: Reverse Proxy (IIS) - RECOMMENDED
```
Browser → IIS (Windows Auth) → Adds header: X-User: john.smith → Tornado
```

**Backend reads header:**
```python
class BaseHandler(tornado.web.RequestHandler):
    def get_current_user(self):
        # Read from IIS-injected header
        return self.request.headers.get('X-User', None)
```

**Benefits:**
- ✅ Zero code changes in frontend
- ✅ Standard enterprise pattern
- ✅ IT/DevOps handles auth infrastructure
- ✅ Works with Active Directory / Windows credentials

**Setup (done by IT/DevOps):**
1. IIS configured for Windows Authentication
2. IIS reverse proxy to Tornado (port 8888)
3. IIS injects authenticated username in header

#### Option 2: Python SSPI
```python
# Use pywin32 or requests-negotiate-sspi
# Tornado reads Windows credentials directly
```

**Benefits:**
- ✅ No reverse proxy needed
- ❌ More complex setup
- ❌ Windows-only

#### Option 3: Azure AD / OAuth (If firm uses it)
```python
# OAuth2 flow
# User logs in via Azure AD
# Backend validates JWT token
```

**Benefits:**
- ✅ Cross-platform
- ✅ Modern authentication
- ❌ More complex setup
- ❌ Requires Azure AD integration

### Migration Path (Dev → Prod)

**Only 5 lines change:**
```python
# Before (dev):
user_id = 'user_a'

# After (prod with IIS):
user_id = self.request.headers.get('X-User', None)
if not user_id:
    self.set_status(401)
    self.write({'error': 'Unauthorized'})
    return
```

---

## Data Flow

### Permissions Flow (Read)
```
1. User opens app in browser
2. App.tsx → useEffect on mount
3. AuthContext.fetchPermissions()
4. services/auth.ts → apiClient('/api/user/permissions')
5. Backend: PermissionsHandler.get()
6. Backend: get_user_permissions(user_id)
7. Backend: Returns JSON {tabs: [...], dd: [...], ...}
8. Frontend: setPermissions(data)
9. Components re-render with permissions
10. NavigatorBar shows only permitted tabs
11. MainArea shows only permitted tools
```

### Settings Flow (Global State)
```
1. User changes dateT in Settings component
2. Settings.tsx → setDateT('2025-01-15')
3. SettingsContext updates state
4. All components using useSettings() re-render
5. Other tabs now see updated dateT
```

### RAD Tool Flow (Fetch Data)
```
1. User clicks RAD tab
2. RAD.tsx → useEffect on mount
3. services/rad.ts → fetchRADData()
4. Backend: RADDataHandler.get() → checks permissions
5. Backend: Returns RAD data JSON
6. Frontend: Sets local state, displays in table
```

### RAD Tool Flow (Submit Form)
```
1. User fills form in RAD component
2. User clicks Submit
3. RAD.tsx → submitRADForm(formData)
4. Backend: RADSubmitHandler.post() → checks permissions
5. Backend: Processes form, returns result
6. Frontend: Shows success message, refreshes data
```

---

## Design Decisions

### 1. Why React Context instead of Redux?

**Context is sufficient because:**
- Only 2-3 global states (auth, settings)
- Simple read/write operations (no complex state machines)
- No need for middleware (no logging, time-travel debugging)
- Easier for junior developers to understand

**When to migrate to Redux:**
- Complex async workflows (multi-step forms)
- Need for middleware (logging, analytics)
- Performance issues with Context (many consumers re-rendering)

### 2. Why Vite instead of Create React App?

**Vite advantages:**
- ✅ 10x faster hot reload (ESM-based)
- ✅ Faster build times
- ✅ Lighter weight (no ejecting needed)
- ✅ Industry moving to Vite (React docs recommend it)

**CRA is deprecated** as of 2023, React docs no longer recommend it.

### 3. Why TypeScript instead of JavaScript?

**For internal enterprise apps, TypeScript is essential:**
- ✅ Prevents "undefined is not a function" errors
- ✅ Better refactoring (rename variable across files)
- ✅ Self-documenting (types show expected data structure)
- ✅ VSCode autocomplete (faster development)

**Cost:** ~10% slower initial development, 50% fewer bugs long-term.

### 4. Why Tornado instead of Flask/FastAPI?

**Tornado chosen because:**
- ✅ Already in use (legacy codebase decision)
- ✅ Async/await support (good for I/O-bound operations)
- ✅ Simpler than Django for small APIs

**If starting from scratch today:** FastAPI would be better choice (better docs, auto-generated OpenAPI schema).

### 5. Why CSS Modules instead of Tailwind/styled-components?

**CSS Modules chosen because:**
- ✅ Scoped styles (no global conflicts)
- ✅ No build-time overhead (Vite handles it)
- ✅ Familiar CSS syntax (easier for non-frontend devs)
- ✅ No large utility class bundles (Tailwind)
- ✅ No runtime overhead (styled-components)

**For this app:** CSS Modules are sufficient. Styling is not complex.

### 6. Why Service Layer pattern?

**Avoids this anti-pattern:**
```typescript
// Bad: Direct fetch in component
const data = await fetch('/api/rad/data').then(r => r.json());
```

**Instead:**
```typescript
// Good: Service layer
import { fetchRADData } from 'services/rad';
const data = await fetchRADData();
```

**Benefits:**
- ✅ Centralized error handling (one place to add retry logic)
- ✅ Easier to mock in tests
- ✅ Easier to add auth headers, logging
- ✅ Component doesn't care about API details

---

## Production Considerations

### Security
- [ ] Enable HTTPS (TLS certificates)
- [ ] Add CORS configuration (restrict origins)
- [ ] Add CSRF protection (for POST/PUT/DELETE)
- [ ] Add rate limiting (prevent abuse)
- [ ] Validate all inputs (backend)
- [ ] Sanitize outputs (prevent XSS)
- [ ] Use parameterized queries (prevent SQL injection)
- [ ] Add security headers (CSP, X-Frame-Options, etc.)

### Performance
- [ ] Add React.lazy() for code splitting
- [ ] Add service worker for caching
- [ ] Optimize bundle size (tree shaking)
- [ ] Add CDN for static assets
- [ ] Add database indexes
- [ ] Add Redis for caching (if needed)

### Monitoring
- [ ] Add error tracking (Sentry, Datadog)
- [ ] Add performance monitoring (Core Web Vitals)
- [ ] Add backend logging (structured logs)
- [ ] Add uptime monitoring (Pingdom, UptimeRobot)
- [ ] Add user analytics (optional, privacy concerns)

### Deployment
- [ ] Dockerize application
- [ ] Set up CI/CD pipeline (GitHub Actions, Jenkins)
- [ ] Environment configs (dev, UAT, prod)
- [ ] Database migrations strategy
- [ ] Backup and recovery procedures
- [ ] Rollback strategy

### Scalability
- [ ] Horizontal scaling (multiple Tornado instances)
- [ ] Load balancer (nginx, IIS ARR)
- [ ] Database connection pooling
- [ ] Caching strategy (Redis)
- [ ] Static asset CDN

---

## Migration Path (MVP → Production)

### Week 1-2: MVP (Current Plan)
- Basic authentication (hardcoded users)
- In-memory storage
- No HTTPS (localhost only)
- No monitoring

### Week 3-4: Internal Testing
- Deploy to internal server
- Add Windows auth (IIS reverse proxy)
- Add real database (PostgreSQL/SQL Server)
- Basic error logging

### Week 5-6: UAT (User Acceptance Testing)
- Deploy to UAT environment
- Add monitoring (error tracking)
- Performance testing
- Security audit

### Week 7+: Production
- Deploy to production
- HTTPS enabled
- Full monitoring
- Disaster recovery plan

---

## Technology Alternatives Considered

| Need | Chosen | Alternatives Considered | Why Not Chosen |
|------|--------|-------------------------|----------------|
| **Frontend Framework** | React | Vue, Angular, Svelte | React has largest ecosystem, best TypeScript support |
| **Build Tool** | Vite | Webpack, Parcel, Rollup | Vite is fastest, best DX |
| **State Management** | Context API | Redux, Zustand, MobX | Context sufficient for scope, zero deps |
| **Styling** | CSS Modules | Tailwind, styled-components, Sass | Simplest for this use case |
| **Backend Framework** | Tornado | Flask, FastAPI, Django | Already chosen (legacy), async support |
| **Database (future)** | PostgreSQL | SQL Server, MySQL, MongoDB | Open source, great Python support, JSON support |
| **API Pattern** | REST | GraphQL, tRPC | REST is simpler, no over-fetching issues at this scale |
| **Testing** | Jest + pytest | Vitest, Mocha, unittest | Industry standard, best tooling |

---

## Glossary

- **RBAC:** Role-Based Access Control
- **Context API:** React's built-in state management
- **Service Layer:** Abstraction layer for API calls
- **Hot Module Replacement (HMR):** Update code without full page reload
- **TypeScript:** JavaScript with static types
- **ESM:** ECMAScript Modules (modern JS import/export)
- **Handler:** Backend class that handles HTTP requests
- **Decorator:** Python function that wraps another function (e.g., for auth checks)

---

## References

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tornado Documentation](https://www.tornadoweb.org/)
- [RBAC Pattern](https://en.wikipedia.org/wiki/Role-based_access_control)

---

**Last Updated:** Phase 1 - Initial Architecture
**Next Review:** After Phase 4 (API Service Layer complete)
