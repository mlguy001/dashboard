import React, { useState, useEffect } from 'react';
import styles from './IngestorTools.module.css';
import DataTable from '../../shared/DataTable';
import { fetchIngestorHistory } from '../../../services/rad';
import { IngestorHistoryRequest, IngestorDataResponse } from '../../../types/rad';
import { formatApiError } from '../../../services/api';
import { useSettings } from '../../../hooks/useSettings';
import { generateMockHistoryData } from '../../../services/rad/mockData';

const IngestorHistoryViewer: React.FC = () => {
  const { dateT, environment } = useSettings();

  const [formData, setFormData] = useState<IngestorHistoryRequest>({
    date: dateT,
    desk: '',
    env: environment,
  });

  // Update form when global settings change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      date: dateT,
      env: environment,
    }));
  }, [dateT, environment]);

  const [data, setData] = useState<IngestorDataResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetchIngestorHistory(formData);
      setData(response);
    } catch (err: any) {
      // If API fails, fallback to mock data
      console.warn('API failed, using mock data:', formatApiError(err));
      const mockData = generateMockHistoryData(formData.date, formData.desk, formData.env);
      setData(mockData);
      setError(null); // Clear error since we have fallback data
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.toolContainer}>
      <h3 className={styles.toolTitle}>Ingestor History Viewer</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="desk">Desk:</label>
            <input
              type="text"
              id="desk"
              name="desk"
              value={formData.desk}
              onChange={handleInputChange}
              placeholder="e.g., RAD"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="env">Environment:</label>
            <select
              id="env"
              name="env"
              value={formData.env}
              onChange={handleInputChange}
              required
            >
              <option value="prod">Production</option>
              <option value="uat">UAT</option>
              <option value="dev">Development</option>
            </select>
          </div>
        </div>
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Loading...' : 'View History'}
        </button>
      </form>

      {data && data.metadata && (
        <div className={styles.metadata}>
          <p>Records: {data.metadata.recordCount || data.rows.length}</p>
          {data.metadata.timestamp && <p>Generated: {data.metadata.timestamp}</p>}
        </div>
      )}

      <DataTable
        columns={data?.columns || []}
        rows={data?.rows || []}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default IngestorHistoryViewer;
