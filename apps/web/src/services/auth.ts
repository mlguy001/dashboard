/**
 * Authentication Service
 *
 * Handles all authentication-related API calls.
 */

import { get } from './api';
import type { Permissions } from 'types/auth';

/**
 * Fetch user permissions from the backend
 *
 * @returns User permissions object with tabs and tool access
 * @throws ApiClientError on failure
 */
export async function fetchUserPermissions(): Promise<Permissions> {
  return get<Permissions>('/api/user/permissions');
}

/**
 * Logout (placeholder for future implementation)
 */
export async function logout(): Promise<void> {
  // Future: Call logout endpoint
  // For now, just clear client-side state
  return Promise.resolve();
}

/**
 * Refresh permissions (same as fetch, but semantically clearer)
 */
export async function refreshPermissions(): Promise<Permissions> {
  return fetchUserPermissions();
}
