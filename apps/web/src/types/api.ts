/**
 * API Response Types
 *
 * Generic types for API responses and errors.
 */

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * API error response
 */
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/**
 * Loading state wrapper
 */
export interface LoadingState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
