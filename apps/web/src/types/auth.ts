// User authentication types

export interface User {
  id: string;
  name?: string;
  roles: string[];
}

export interface Permissions {
  tabs: string[];
  dd: string[];
  rad: string[];
  exotics: string[];
  ldfx: string[];
  fxg: string[];
  options: string[];
  inflation: string[];
  settings: string[];
}

export interface AuthState {
  user: User | null;
  permissions: Permissions;
  loading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  fetchPermissions: () => Promise<void>;
  logout: () => void;
}
