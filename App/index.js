/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unused-state */
/* eslint-disable global-require */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Moment from 'moment';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';

import { enableScreens } from 'react-native-screens';

import { PersistGate } from 'redux-persist/integration/react';
import FontList from './Core/Assets/Fonts';
import Navigator from './Navigation/AppToken';
import { store, persistor } from './Redux/RootReducer';
import LoadingState from './Components/LoadingState';

Moment.locale('es');

enableScreens();
class App extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync(FontList);

    this.setState({ fontLoaded: true });
  }

  render() {
    const { fontLoaded } = this.state;

    if (!fontLoaded) {
      return (
        <View style={styles.loaderContainer}>
          <LoadingState.Small />
        </View>
      );
    }
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<LoadingState.Medium />}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
