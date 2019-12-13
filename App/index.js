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

Moment.lang('es', {
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Juilio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
    '_'
  ),
  monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
  weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
  weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
  weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_'),
});

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
