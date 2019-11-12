import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

// Screens
import LoginScreen from '../Screens/SyncAccount';
import RegisterScreen from '../Screens/Register';

const config = Platform.select({
  web: { headerMode: 'none' },
  default: {
    headerMode: 'none',
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
  },
  config
);

export default AuthNavigator;
