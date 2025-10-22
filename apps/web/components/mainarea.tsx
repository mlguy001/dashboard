
import React from 'react';
import Settings from './settings/settings';
import RAD from './rad/rad';
import DD from './dd/dd';
import Exotics from './exotics/exotics';
import LDFX from './ldfx/ldfx';
import FXG from './fxg/fxg';
import Options from './options/options';
import Inflation from './inflation/inflation';

interface MainAreaProps {
  activeTab: string;
}

const components: {[key: string]: React.ReactElement} = {
  settings: <Settings />,
  rad: <RAD />,
  dd: <DD />,
  exotics: <Exotics />,
  ldfx: <LDFX />,
  fxg: <FXG />,
  options: <Options />,
  inflation: <Inflation />
};

const MainArea: React.FC<MainAreaProps> = ({ activeTab }) => {
  return (
    <div>
      {components[activeTab]}
    </div>
  );
};

export default MainArea;
