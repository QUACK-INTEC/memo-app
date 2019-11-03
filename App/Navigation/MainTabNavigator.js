import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

// Screens
import Playground from '../Screens/Playground';
import Home from '../Screens/Home';
import Register from '../Screens/Register';

const config = Platform.select({
  web: { headerMode: 'none' },
  default: { headerMode: 'none', tabBarVisible: false },
});

const HomeStack = createStackNavigator(
  {
    Home,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
};

HomeStack.path = '';

const PlaygroundStack = createStackNavigator(
  {
    Playground,
  },
  config
);

PlaygroundStack.navigationOptions = {
  tabBarLabel: 'Playground',
};

const RegisterStack = createStackNavigator(
  {
    Register,
  },
  config
);

RegisterStack.navigationOptions = {
  tabBarVisible: false,
};

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  PlaygroundStack,
});

tabNavigator.path = '';

export default RegisterStack;
