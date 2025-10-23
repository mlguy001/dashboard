/**
 * RAD Service
 *
 * API methods for RAD ingestor tools including history viewer,
 * snapshot, and force run.
 */

import { get, post } from './api';
import {
  IngestorHistoryRequest,
  IngestorSnapshotRequest,
  IngestorForceRunRequest,
  IngestorDataResponse,
  IngestorTemplate,
} from '../types/rad';
import { ApiResponse } from '../types/api';

/**
 * Fetch ingestor history data
 */
export async function fetchIngestorHistory(
  request: IngestorHistoryRequest
): Promise<IngestorDataResponse> {
  const params = new URLSearchParams({
    date: request.date,
    desk: request.desk,
    env: request.env,
  });
  const response = await get<ApiResponse<IngestorDataResponse>>(
    `/api/rad/ingestor/history?${params.toString()}`
  );
  return response.data;
}

/**
 * Fetch ingestor snapshot data
 */
export async function fetchIngestorSnapshot(
  request: IngestorSnapshotRequest
): Promise<IngestorDataResponse> {
  const params = new URLSearchParams({
    date: request.date,
    desk: request.desk,
    env: request.env,
  });
  const response = await get<ApiResponse<IngestorDataResponse>>(
    `/api/rad/ingestor/snapshot?${params.toString()}`
  );
  return response.data;
}

/**
 * Fetch ingestor template for force run
 */
export async function fetchIngestorTemplate(): Promise<IngestorTemplate> {
  const response = await get<ApiResponse<IngestorTemplate>>(
    '/api/rad/ingestor/template'
  );
  return response.data;
}

/**
 * Submit ingestor force run request
 */
export async function submitIngestorForceRun(
  request: IngestorForceRunRequest
): Promise<ApiResponse<any>> {
  return post<ApiResponse<any>>('/api/rad/ingestor/force-run', request);
}
