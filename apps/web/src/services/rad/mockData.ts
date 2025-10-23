/**
 * Mock Data Generators for RAD Tools
 *
 * Generates realistic sample data for testing and development.
 */

import { IngestorDataResponse, IngestorTemplate, IngestorTableRow } from '../../types/rad';

const DESKS = ['DD', 'LDFX', 'FXG', 'Exotics', 'Options', 'Inflation'];
const STATUSES = ['completed', 'running', 'failed', 'pending'];
const INSTRUMENTS = ['SWAP', 'FWD', 'OPT', 'CAP', 'FLOOR', 'SWAPTION'];

/**
 * Generate a random date within the last 30 days
 */
const getRandomDate = (baseDate: string): string => {
  const base = new Date(baseDate);
  const offset = Math.floor(Math.random() * 30);
  base.setDate(base.getDate() - offset);
  return base.toISOString().split('T')[0];
};

/**
 * Generate a random time in HH:MM:SS format
 */
const getRandomTime = (): string => {
  const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0');
  const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  const seconds = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

/**
 * Generate mock data for Ingestor History Viewer
 */
export const generateMockHistoryData = (date: string, desk: string, env: string): IngestorDataResponse => {
  const numRows = Math.floor(Math.random() * 10) + 20; // 20-30 rows
  const rows = [];

  for (let i = 0; i < numRows; i++) {
    rows.push({
      id: `hist-${i}`,
      date: getRandomDate(date),
      desk: desk || DESKS[Math.floor(Math.random() * DESKS.length)],
      status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
      recordCount: Math.floor(Math.random() * 5000) + 100,
      lastUpdated: `${getRandomDate(date)} ${getRandomTime()}`,
      environment: env,
    });
  }

  return {
    columns: ['date', 'desk', 'status', 'recordCount', 'lastUpdated', 'environment'],
    rows,
    metadata: {
      source: 'mock-data',
      timestamp: new Date().toISOString(),
      recordCount: rows.length,
    },
  };
};

/**
 * Generate mock data for Ingestor Snapshot
 */
export const generateMockSnapshotData = (date: string, desk: string, env: string): IngestorDataResponse => {
  const numRows = Math.floor(Math.random() * 10) + 15; // 15-25 rows
  const rows = [];

  for (let i = 0; i < numRows; i++) {
    rows.push({
      id: `snap-${i}`,
      desk: desk || DESKS[Math.floor(Math.random() * DESKS.length)],
      instrument: INSTRUMENTS[Math.floor(Math.random() * INSTRUMENTS.length)],
      position: (Math.random() * 1000000 - 500000).toFixed(2),
      notional: (Math.random() * 10000000).toFixed(2),
      timestamp: `${date} ${getRandomTime()}`,
      environment: env,
      status: Math.random() > 0.2 ? 'active' : 'inactive',
    });
  }

  return {
    columns: ['desk', 'instrument', 'position', 'notional', 'timestamp', 'environment', 'status'],
    rows,
    metadata: {
      source: 'mock-data',
      timestamp: new Date().toISOString(),
      recordCount: rows.length,
    },
  };
};

/**
 * Generate mock templates for Force Run
 */
export const generateMockTemplates = (): Record<string, IngestorTemplate> => {
  return {
    'template-a': {
      columns: ['desk', 'instrument', 'quantity', 'price', 'currency', 'tradeDate'],
      rows: Array.from({ length: 12 }, (_, i) => ({
        id: `template-a-${i}`,
        desk: DESKS[i % DESKS.length],
        instrument: INSTRUMENTS[i % INSTRUMENTS.length],
        quantity: String(Math.floor(Math.random() * 10000) + 1000),
        price: (Math.random() * 1000 + 50).toFixed(2),
        currency: ['USD', 'EUR', 'GBP', 'JPY'][i % 4],
        tradeDate: new Date().toISOString().split('T')[0],
      })),
    },
    'template-b': {
      columns: ['desk', 'counterparty', 'notional', 'rate', 'maturityDate'],
      rows: Array.from({ length: 10 }, (_, i) => ({
        id: `template-b-${i}`,
        desk: DESKS[i % DESKS.length],
        counterparty: `COUNTER-${String(i + 1).padStart(3, '0')}`,
        notional: String(Math.floor(Math.random() * 5000000) + 100000),
        rate: (Math.random() * 5 + 0.5).toFixed(4),
        maturityDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      })),
    },
    'template-c': {
      columns: ['desk', 'product', 'buySell', 'volume', 'executionTime', 'venue', 'trader'],
      rows: Array.from({ length: 15 }, (_, i) => ({
        id: `template-c-${i}`,
        desk: DESKS[i % DESKS.length],
        product: INSTRUMENTS[i % INSTRUMENTS.length],
        buySell: i % 2 === 0 ? 'BUY' : 'SELL',
        volume: String(Math.floor(Math.random() * 100000) + 10000),
        executionTime: `${getRandomTime()}`,
        venue: ['NYSE', 'NASDAQ', 'LSE', 'TSE'][i % 4],
        trader: `TRD-${String(i + 1).padStart(3, '0')}`,
      })),
    },
    'custom': {
      columns: ['desk', 'field1', 'field2', 'field3', 'field4'],
      rows: [
        {
          id: 'custom-1',
          desk: 'DD',
          field1: '',
          field2: '',
          field3: '',
          field4: '',
        },
      ],
    },
  };
};

/**
 * Get template by ID
 */
export const getMockTemplate = (templateId: string): IngestorTemplate | null => {
  const templates = generateMockTemplates();
  return templates[templateId] || null;
};

/**
 * Get list of available template names
 */
export const getMockTemplateList = (): Array<{ id: string; name: string }> => {
  return [
    { id: 'template-a', name: 'Template A - Standard Trades' },
    { id: 'template-b', name: 'Template B - Swap Contracts' },
    { id: 'template-c', name: 'Template C - Market Executions' },
    { id: 'custom', name: 'Custom - Empty Template' },
  ];
};
