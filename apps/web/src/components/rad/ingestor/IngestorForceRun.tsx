import React, { useState } from 'react';
import styles from './IngestorTools.module.css';
import EditableTable from '../../shared/EditableTable';
import { fetchIngestorTemplate, submitIngestorForceRun } from '../../../services/rad';
import { IngestorTableRow, IngestorTemplate } from '../../../types/rad';
import { formatApiError } from '../../../services/api';

const IngestorForceRun: React.FC = () => {
  const [template, setTemplate] = useState<IngestorTemplate | null>(null);
  const [tableData, setTableData] = useState<IngestorTableRow[]>([]);
  const [loadingTemplate, setLoadingTemplate] = useState(false);
  const [templateError, setTemplateError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    env: 'prod',
    dryRun: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleLoadTemplate = async () => {
    setLoadingTemplate(true);
    setTemplateError(null);
    setSubmitResult(null);
    setSubmitError(null);

    try {
      const templateData = await fetchIngestorTemplate();
      setTemplate(templateData);
      setTableData(templateData.rows);
    } catch (err: any) {
      setTemplateError(formatApiError(err));
    } finally {
      setLoadingTemplate(false);
    }
  };

  const handleTableChange = (updatedRows: IngestorTableRow[]) => {
    setTableData(updatedRows);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSubmitResult(null);

    try {
      const response = await submitIngestorForceRun({
        env: formData.env,
        dryRun: formData.dryRun,
        tableData,
      });
      setSubmitResult(response.message || 'Force run submitted successfully');
    } catch (err: any) {
      setSubmitError(formatApiError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.toolContainer}>
      <h3 className={styles.toolTitle}>Ingestor Force Run</h3>

      {!template && (
        <div className={styles.templateSection}>
          <p className={styles.instructions}>
            Load a template to begin configuring the force run parameters.
          </p>
          <button
            onClick={handleLoadTemplate}
            className={styles.submitButton}
            disabled={loadingTemplate}
          >
            {loadingTemplate ? 'Loading Template...' : 'Load Template'}
          </button>
          {templateError && (
            <div className={styles.errorMessage}>Error: {templateError}</div>
          )}
        </div>
      )}

      {template && (
        <form onSubmit={handleSubmit}>
          <div className={styles.section}>
            <h4>Edit Template Data</h4>
            <p className={styles.instructions}>
              Modify, add, or delete rows as needed. Click "Add Row" to add new entries.
            </p>
            <EditableTable
              columns={template.columns}
              initialRows={tableData}
              onChange={handleTableChange}
            />
          </div>

          <div className={styles.section}>
            <h4>Run Configuration</h4>
            <div className={styles.formRow}>
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
              <div className={styles.formGroup}>
                <label htmlFor="dryRun" className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    id="dryRun"
                    name="dryRun"
                    checked={formData.dryRun}
                    onChange={handleInputChange}
                  />
                  <span>Dry Run (simulate without executing)</span>
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className={styles.submitButton} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Force Run'}
          </button>
        </form>
      )}

      {submitResult && (
        <div className={styles.successMessage}>{submitResult}</div>
      )}
      {submitError && (
        <div className={styles.errorMessage}>Error: {submitError}</div>
      )}
    </div>
  );
};

export default IngestorForceRun;
