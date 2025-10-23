/**
 * Base API Client
 *
 * Centralized HTTP client with error handling, JSON parsing, and status checks.
 * All API calls should go through this client for consistency.
 */

import type { ApiResponse, ApiError } from 'types/api';

/**
 * API configuration
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Custom error class for API errors
 */
export class ApiClientError extends Error {
  status: number;
  statusText: string;
  data?: any;

  constructor(status: number, statusText: string, data?: any) {
    super(`API Error: ${status} ${statusText}`);
    this.name = 'ApiClientError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

/**
 * Base API client function
 *
 * @param endpoint - API endpoint (e.g., '/api/user/permissions')
 * @param options - Fetch options (method, headers, body, etc.)
 * @returns Parsed JSON response
 * @throws ApiClientError on HTTP errors
 */
export async function apiClient<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    // Make the request
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    // Handle non-2xx responses
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        // Response body is not JSON
        errorData = { message: response.statusText };
      }

      throw new ApiClientError(response.status, response.statusText, errorData);
    }

    // Parse JSON response
    const data = await response.json();
    return data as T;
  } catch (error) {
    // Re-throw ApiClientError as-is
    if (error instanceof ApiClientError) {
      throw error;
    }

    // Network errors, JSON parsing errors, etc.
    if (error instanceof Error) {
      throw new ApiClientError(0, 'Network Error', { message: error.message });
    }

    // Unknown error
    throw new ApiClientError(0, 'Unknown Error', { message: String(error) });
  }
}

/**
 * GET request helper
 */
export async function get<T = any>(endpoint: string): Promise<T> {
  return apiClient<T>(endpoint, { method: 'GET' });
}

/**
 * POST request helper
 */
export async function post<T = any>(
  endpoint: string,
  data?: any
): Promise<T> {
  return apiClient<T>(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT request helper
 */
export async function put<T = any>(
  endpoint: string,
  data?: any
): Promise<T> {
  return apiClient<T>(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE request helper
 */
export async function del<T = any>(endpoint: string): Promise<T> {
  return apiClient<T>(endpoint, { method: 'DELETE' });
}

/**
 * Helper to check if error is an ApiClientError
 */
export function isApiError(error: any): error is ApiClientError {
  return error instanceof ApiClientError;
}

/**
 * Format API error for display
 */
export function formatApiError(error: any): string {
  if (isApiError(error)) {
    if (error.status === 0) {
      return 'Network error. Please check your connection.';
    }
    if (error.status === 401) {
      return 'Unauthorized. Please log in again.';
    }
    if (error.status === 403) {
      return 'Forbidden. You do not have permission to access this resource.';
    }
    if (error.status === 404) {
      return 'Resource not found.';
    }
    if (error.status >= 500) {
      return 'Server error. Please try again later.';
    }
    return error.data?.message || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred.';
}
