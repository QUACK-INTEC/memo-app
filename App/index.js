/* eslint-disable react/no-unused-state */
/* eslint-disable global-require */
import React, { Component } from 'react';
import { Text } from 'react-native';

import { Provider } from 'react-redux';
import * as Font from 'expo-font';

import AppNavigator from './Navigation/AppNavigator';
import store from './Redux';

class App extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'poppins-black': require('./Core/Assets/Fonts/Poppins-Black.ttf'),
      'poppins-black-italic': require('./Core/Assets/Fonts/Poppins-BlackItalic.ttf'),
      'poppins-bold': require('./Core/Assets/Fonts/Poppins-Bold.ttf'),
      'poppins-bold-italic': require('./Core/Assets/Fonts/Poppins-BoldItalic.ttf'),
      'poppins-extra-bold': require('./Core/Assets/Fonts/Poppins-ExtraBold.ttf'),
      'poppins-extra-bold-italic': require('./Core/Assets/Fonts/Poppins-ExtraBoldItalic.ttf'),
      'poppins-extra-light': require('./Core/Assets/Fonts/Poppins-ExtraLight.ttf'),
      'poppins-extra-light-italic': require('./Core/Assets/Fonts/Poppins-ExtraLightItalic.ttf'),
      'poppins-italic': require('./Core/Assets/Fonts/Poppins-Italic.ttf'),
      'poppins-light': require('./Core/Assets/Fonts/Poppins-Light.ttf'),
      'poppins-light-italic': require('./Core/Assets/Fonts/Poppins-LightItalic.ttf'),
      'poppins-medium': require('./Core/Assets/Fonts/Poppins-Medium.ttf'),
      'poppins-medium-italic': require('./Core/Assets/Fonts/Poppins-MediumItalic.ttf'),
      'poppins-regular': require('./Core/Assets/Fonts/Poppins-Regular.ttf'),
      'poppins-semi-bold': require('./Core/Assets/Fonts/Poppins-SemiBold.ttf'),
      'poppins-semi-bold-italic': require('./Core/Assets/Fonts/Poppins-SemiBoldItalic.ttf'),
      'poppins-thin': require('./Core/Assets/Fonts/Poppins-Thin.ttf'),
      'poppins-thin-italic': require('./Core/Assets/Fonts/Poppins-ThinItalic.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    const { fontLoaded } = this.state;

    if (!fontLoaded) {
      return <Text>Loading...</Text>;
    }

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
