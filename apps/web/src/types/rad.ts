/**
 * RAD Tool Types
 *
 * Type definitions for RAD ingestor tools including history viewer,
 * snapshot, and force run.
 */

/**
 * Form input for Ingestor History Viewer
 */
export interface IngestorHistoryRequest {
  date: string;
  desk: string;
  env: string;
}

/**
 * Form input for Ingestor Snapshot
 */
export interface IngestorSnapshotRequest {
  date: string;
  desk: string;
  env: string;
}

/**
 * Table row data structure (used in Force Run)
 */
export interface IngestorTableRow {
  id: string;
  [key: string]: any; // Allow dynamic columns
}

/**
 * Template structure returned from server
 */
export interface IngestorTemplate {
  columns: string[];
  rows: IngestorTableRow[];
}

/**
 * Form input for Ingestor Force Run
 */
export interface IngestorForceRunRequest {
  env: string;
  dryRun: boolean;
  tableData: IngestorTableRow[];
}

/**
 * Response structure for data table views
 */
export interface IngestorDataResponse {
  columns: string[];
  rows: Record<string, any>[];
  metadata?: {
    source?: string;
    timestamp?: string;
    recordCount?: number;
  };
}
