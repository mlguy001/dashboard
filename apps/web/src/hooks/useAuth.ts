import { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import type { AuthContextType } from 'types/auth';

/**
 * Custom hook to consume AuthContext
 *
 * Provides access to authentication state and methods:
 * - user: Current user information
 * - permissions: User's role-based permissions
 * - loading: Whether permissions are being fetched
 * - error: Any error that occurred during fetch
 * - fetchPermissions: Function to refetch permissions
 * - logout: Function to clear auth state
 *
 * @throws Error if used outside of AuthProvider
 *
 * @example
 * const { user, permissions, loading } = useAuth();
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
