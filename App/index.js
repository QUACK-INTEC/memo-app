/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unused-state */
/* eslint-disable global-require */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Moment from 'moment';
import { Provider, connect } from 'react-redux';
import * as Font from 'expo-font';
import { enableScreens } from 'react-native-screens';

import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './Navigation/AppNavigator';
import { store, persistor } from './Redux/RootReducer';
import LoadingState from './Components/LoadingState';

import { selectors as userManagerSelectors } from './Redux/Common/UserManager';

import WithLogger from './HOCs/WithLogger';

const LOCALE = {
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Juilio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
    '_'
  ),
  weekdaysShort: 'Dom_Lun_Mar_Mie_Jue_Vie_Sab'.split('_'),
};
enableScreens();
class App extends Component {
  constructor() {
    Moment.locale('es', LOCALE);
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
      return (
        <View style={styles.loaderContainer}>
          <LoadingState.Medium />
        </View>
      );
    }
    console.log(store.getState());
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<LoadingState.Medium />}>
          <NavigatorWithState />
        </PersistGate>
      </Provider>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { isLogged } = userManagerSelectors;
  return {
    loggedIn: isLogged(state, props),
  };
};

const NavigatorWithState = WithLogger(
  connect(
    mapStateToProps,
    null
  )(AppNavigator)
);

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
