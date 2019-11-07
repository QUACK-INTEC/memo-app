import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarLabel from '../Components/TabBar/TabBarLabel';
import TabBarIcon from '../Components/TabBar/TabBarIcon';

import Playground from '../Screens/Playground';
import HomeScreen from '../Screens/Home';
import CalendarScreen from '../Screens/Calendar';
import ClassRoomScreen from '../Screens/ClassRooms';
import ProfileScreen from '../Screens/Profile';

const config = Platform.select({
  web: { headerMode: 'none' },
  default: { headerMode: 'none' },
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} name="Inicio" />,
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" type="MEMO_ICONS" />,
};

HomeStack.path = '';

const CalendarStack = createStackNavigator(
  {
    Calendar: CalendarScreen,
  },
  config
);

CalendarStack.navigationOptions = {
  tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} name="Calendario" />,
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="calendar" type="MEMO_ICONS" />,
};

CalendarStack.path = '';

const AddStack = createStackNavigator(
  {
    Profile: Playground,
  },
  config
);

AddStack.navigationOptions = {
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      center
      focused={focused}
      name="add"
      type="MEMO_ICONS"
      size="EXTRA_SMALL"
      colorDef="WHITE"
    />
  ),
};

AddStack.path = '';

const ClassRoomStack = createStackNavigator(
  {
    Clases: ClassRoomScreen,
  },
  config
);

ClassRoomStack.navigationOptions = {
  tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} name="Clases" />,
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="whiteboard" type="MEMO_ICONS" />,
};

ClassRoomStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} name="Perfil" />,
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="user" type="MEMO_ICONS" />,
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  CalendarStack,
  AddStack,
  ClassRoomStack,
  ProfileStack,
});

tabNavigator.path = '';

export default tabNavigator;
