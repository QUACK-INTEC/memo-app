import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

// Screens
import LoginScreen from '../Screens/Login';
import RegisterScreen from '../Screens/Register';
import RecoverPasswordScreen from '../Screens/RecoverPassword';
import SyncScreen from '../Screens/SyncAccount';

const config = Platform.select({
  web: { headerMode: 'none' },
  default: {
    headerMode: 'none',
    unmountInactiveRoutes: true,
  },
});

const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
    Sync: {
      screen: SyncScreen,
      navigationOptions: () => ({
        gesturesEnabled: false,
      }),
    },
    RecoverPassword: {
      screen: RecoverPasswordScreen,
    },
  },
  config
);

export default AuthNavigator;
