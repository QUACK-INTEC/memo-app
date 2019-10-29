import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

// Screens
import Playground from '../Screens/Playground';
import Home from '../Screens/Home';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
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

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  PlaygroundStack,
});

tabNavigator.path = '';

export default tabNavigator;
