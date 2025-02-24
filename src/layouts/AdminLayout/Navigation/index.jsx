import React, { useContext, useState, useEffect } from 'react';
import { ConfigContext } from '../../../contexts/ConfigContext';
import { UserContext } from '../../../contexts/UserContext';
import useWindowSize from '../../../hooks/useWindowSize';
import NavLogo from './NavLogo';
import NavContent from './NavContent';
import getMenuItems from '../../../menu-items';

const NavigationComponent = () => {
  const {
    state: { collapseMenu }
  } = useContext(ConfigContext);
  const windowSize = useWindowSize();
  const { role } = useContext(UserContext); // Get role from UserContext

  // Initialize state using the current role
  const [navigation, setNavigation] = useState(() => getMenuItems(role));

  // Update navigation whenever the role changes
  useEffect(() => {
    setNavigation(getMenuItems(role));
  }, [role]);

  const navClass = ['pcoded-navbar'];
  if (windowSize.width < 992 && collapseMenu) {
    navClass.push('mob-open');
  } else if (collapseMenu) {
    navClass.push('navbar-collapsed');
  }

  return (
    <nav className={navClass.join(' ')}>
      <div className="navbar-wrapper">
        <NavLogo />
        <NavContent navigation={navigation.items} />
      </div>
    </nav>
  );
};

export default NavigationComponent;
