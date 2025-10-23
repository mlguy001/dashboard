import React, { createContext, useState, useEffect, ReactNode } from 'react';
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

      const response = await fetch('/api/user/permissions');

      if (!response.ok) {
        throw new Error(`Failed to fetch permissions: ${response.status}`);
      }

      const data = await response.json();

      setPermissions(data);

      // Set user (for now, hardcoded - will be from backend later)
      setUser({
        id: 'user_a',
        name: 'User A',
        roles: ['admin'],
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
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
