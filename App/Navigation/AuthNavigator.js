import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

// Screens
import LoginScreen from '../Screens/Login';
import RegisterScreen from '../Screens/Register';
import RecoverPasswordScreen from '../Screens/RecoverPassword';
import SyncScreen from '../Screens/SyncAccount';
import PasswordRecoveryCodeScreen from '../Screens/PasswordRecoveryCode';
import ChangePasswordScreen from '../Screens/ChangePassword';

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
    },
    RecoverPassword: {
      screen: RecoverPasswordScreen,
    },
    PasswordRecoveryCode: {
      screen: PasswordRecoveryCodeScreen,
    },
    ChangePassword: {
      screen: ChangePasswordScreen,
    },
  },
  config
);

export default AuthNavigator;
