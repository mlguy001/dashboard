import React, { useState } from 'react';
import styles from './EditableTable.module.css';
import { IngestorTableRow } from '../../types/rad';

interface EditableTableProps {
  columns: string[];
  initialRows: IngestorTableRow[];
  onChange: (rows: IngestorTableRow[]) => void;
}

const EditableTable: React.FC<EditableTableProps> = ({ columns, initialRows, onChange }) => {
  const [rows, setRows] = useState<IngestorTableRow[]>(initialRows);

  const handleCellChange = (rowId: string, column: string, value: string) => {
    const updatedRows = rows.map((row) =>
      row.id === rowId ? { ...row, [column]: value } : row
    );
    setRows(updatedRows);
    onChange(updatedRows);
  };

  const handleAddRow = () => {
    const newRow: IngestorTableRow = {
      id: `row-${Date.now()}`,
    };
    // Initialize all columns with empty strings
    columns.forEach((col) => {
      if (col !== 'id') {
        newRow[col] = '';
      }
    });
    const updatedRows = [...rows, newRow];
    setRows(updatedRows);
    onChange(updatedRows);
  };

  const handleDeleteRow = (rowId: string) => {
    const updatedRows = rows.filter((row) => row.id !== rowId);
    setRows(updatedRows);
    onChange(updatedRows);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.filter(col => col !== 'id').map((column) => (
                <th key={column}>{column}</th>
              ))}
              <th className={styles.actionColumn}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {columns.filter(col => col !== 'id').map((column) => (
                  <td key={`${row.id}-${column}`}>
                    <input
                      type="text"
                      value={row[column] || ''}
                      onChange={(e) => handleCellChange(row.id, column, e.target.value)}
                      className={styles.cellInput}
                    />
                  </td>
                ))}
                <td className={styles.actionColumn}>
                  <button
                    onClick={() => handleDeleteRow(row.id)}
                    className={styles.deleteButton}
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleAddRow} className={styles.addButton} type="button">
        + Add Row
      </button>
    </div>
  );
};

export default EditableTable;
