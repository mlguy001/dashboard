import React from 'react';
import styles from './DataTable.module.css';

interface DataTableProps {
  columns: string[];
  rows: Record<string, any>[];
  loading?: boolean;
  error?: string | null;
}

const DataTable: React.FC<DataTableProps> = ({ columns, rows, loading, error }) => {
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>Error: {error}</p>
      </div>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={`${rowIndex}-${column}`}>
                  {row[column] !== null && row[column] !== undefined
                    ? String(row[column])
                    : '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
