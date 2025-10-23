import React from 'react';
import { useSettings } from 'hooks/useSettings';
import LocalServerManager from './LocalServerManager';
import styles from './Settings.module.css';

const Settings: React.FC = () => {
  const { dateT, setDateT, dateTMinus1, setDateTMinus1, environment, setEnvironment } = useSettings();

  return (
    <div className={styles.container}>
      <h1>Settings</h1>

      <section className={styles.section}>
        <h2>Global Settings</h2>
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
              onChange={(e) => setEnvironment(e.target.value as 'prod' | 'uat' | 'dev')}
            >
              <option value="prod">Prod</option>
              <option value="uat">UAT</option>
              <option value="dev">Dev</option>
            </select>
          </div>
        </form>
      </section>

      <section className={styles.section}>
        <LocalServerManager />
      </section>
    </div>
  );
};

export default Settings;
