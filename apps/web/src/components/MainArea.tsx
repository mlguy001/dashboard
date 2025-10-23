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
  permissions: {
    tabs: string[];
    dd: string[];
    rad: string[];
    exotics: string[];
    ldfx: string[];
    fxg: string[];
    options: string[];
    inflation: string[];
  };
}

const MainArea: React.FC<MainAreaProps> = ({ activeTab, permissions }) => {
  const components: { [key: string]: React.ReactElement } = {
    settings: <Settings />,
    rad: <RAD permissions={permissions.rad} />,
    dd: <DD permissions={permissions.dd} />,
    exotics: <Exotics permissions={permissions.exotics} />,
    ldfx: <LDFX permissions={permissions.ldfx} />,
    fxg: <FXG permissions={permissions.fxg} />,
    options: <Options permissions={permissions.options} />,
    inflation: <Inflation permissions={permissions.inflation} />,
  };

  return <div>{components[activeTab]}</div>;
};

export default MainArea;
