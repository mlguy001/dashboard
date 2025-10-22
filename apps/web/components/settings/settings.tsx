
import React, { useState } from 'react';

const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // Format YYYY-MM-DD
};

const getPreviousBusinessDate = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6
  if (dayOfWeek === 1) { // Monday
    // Subtract three days to get to Friday
    today.setDate(today.getDate() - 3);
  } else if (dayOfWeek === 0) { // Sunday
    // Subtract two days to get to Friday
    today.setDate(today.getDate() - 2);
  } else {
    // Subtract one day
    today.setDate(today.getDate() - 1);
  }
  return today.toISOString().split('T')[0]; // Format YYYY-MM-DD
};

const Settings: React.FC = () => {
  const [dateT, setDateT] = useState(getCurrentDate());
  const [dateTMinus1, setDateTMinus1] = useState(getPreviousBusinessDate());
  const [environment, setEnvironment] = useState('prod');

  return (
    <div className="settings">
      <h1>Settings</h1>
      <form>
        <div>
          <label htmlFor="dateT">Date (T):</label>
          <input
            type="date"
            id="dateT"
            value={dateT}
            onChange={(e) => setDateT(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dateTMinus1">Date (T-1):</label>
          <input
            type="date"
            id="dateTMinus1"
            value={dateTMinus1}
            onChange={(e) => setDateTMinus1(e.target.value)}
          />
        </div>
        <div>
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
