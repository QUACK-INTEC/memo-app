import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

// Screens
import LoginScreen from '../Screens/Login';
import RegisterScreen from '../Screens/Register';
import RecoverPasswordScreen from '../Screens/RecoverPassword';

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
    RecoverPassword: {
      screen: RecoverPasswordScreen,
    },
  },
  config
);

export default AuthNavigator;
