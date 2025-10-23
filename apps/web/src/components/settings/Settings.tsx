import React, { useState } from 'react';
import styles from './Settings.module.css';

const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const getPreviousBusinessDate = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  if (dayOfWeek === 1) {
    today.setDate(today.getDate() - 3);
  } else if (dayOfWeek === 0) {
    today.setDate(today.getDate() - 2);
  } else {
    today.setDate(today.getDate() - 1);
  }
  return today.toISOString().split('T')[0];
};

const Settings: React.FC = () => {
  const [dateT, setDateT] = useState(getCurrentDate());
  const [dateTMinus1, setDateTMinus1] = useState(getPreviousBusinessDate());
  const [environment, setEnvironment] = useState('prod');

  return (
    <div className={styles.container}>
      <h1>Settings</h1>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="dateT">Date (T):</label>
          <input
            type="date"
            id="dateT"
            value={dateT}
            onChange={(e) => setDateT(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="dateTMinus1">Date (T-1):</label>
          <input
            type="date"
            id="dateTMinus1"
            value={dateTMinus1}
            onChange={(e) => setDateTMinus1(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="environment">Environment:</label>
          <select
            id="environment"
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
          >
            <option value="prod">Prod</option>
            <option value="uat">UAT</option>
            <option value="dev">Dev</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Settings;
