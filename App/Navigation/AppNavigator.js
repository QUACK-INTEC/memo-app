import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import PropTypes from 'prop-types';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';

const AppNavigator = ({ loggedIn }) => {
  const AppContainer = createAppContainer(
    createSwitchNavigator(
      {
        Auth: AuthNavigator,
        Main: MainTabNavigator,
      },
      {
        initialRouteName: loggedIn ? 'Main' : 'Auth',
      }
    )
  );
  return <AppContainer />;
};

export default AppNavigator;

AppNavigator.defaultProps = {
  loggedIn: false,
};

AppNavigator.propTypes = {
  loggedIn: PropTypes.bool,
};
