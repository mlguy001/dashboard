import React from 'react';
import Settings from 'components/settings/Settings';
import RAD from 'components/rad/RAD';
import DD from 'components/dd/DD';
import Exotics from 'components/exotics/Exotics';
import LDFX from 'components/ldfx/LDFX';
import FXG from 'components/fxg/FXG';
import Options from 'components/options/Options';
import Inflation from 'components/inflation/Inflation';

interface MainAreaProps {
  activeTab: string;
}

const MainArea: React.FC<MainAreaProps> = ({ activeTab }) => {
  const components: { [key: string]: React.ReactElement } = {
    settings: <Settings />,
    rad: <RAD />,
    dd: <DD />,
    exotics: <Exotics />,
    ldfx: <LDFX />,
    fxg: <FXG />,
    options: <Options />,
    inflation: <Inflation />,
  };

  return <div>{components[activeTab]}</div>;
};

export default MainArea;
