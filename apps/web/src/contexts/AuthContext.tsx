import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { fetchUserPermissions } from 'services/auth';
import { formatApiError } from 'services/api';
import type { AuthContextType, Permissions } from 'types/auth';

// Default permissions (empty state)
const defaultPermissions: Permissions = {
  tabs: [],
  dd: [],
  rad: [],
  exotics: [],
  ldfx: [],
  fxg: [],
  options: [],
  inflation: [],
  settings: [],
};

// Create context with undefined as initial value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [permissions, setPermissions] = useState<Permissions>(defaultPermissions);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use auth service instead of direct fetch
      const data = await fetchUserPermissions();

      setPermissions(data);

      // Set user (for now, hardcoded - will be from backend later)
      setUser({
        id: 'user_a',
        name: 'User A',
        roles: ['admin'],
      });
    } catch (err) {
      // Use formatApiError for consistent error messages
      const errorMessage = formatApiError(err);
      setError(errorMessage);
      console.error('Error fetching permissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setPermissions(defaultPermissions);
    setError(null);
  };

  // Fetch permissions on mount
  useEffect(() => {
    fetchPermissions();
  }, []);

  const value: AuthContextType = {
    user,
    permissions,
    loading,
    error,
    fetchPermissions,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
