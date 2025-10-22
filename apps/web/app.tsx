
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import NavigatorBar from './components/navigatorbar';
import MainArea from './components/mainarea';

const App = () => {
  const [activeTab, setActiveTab] = useState('settings');

  return (
    <div>
      <NavigatorBar setActiveTab={setActiveTab} />
      <MainArea activeTab={activeTab} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
