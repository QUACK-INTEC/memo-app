import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarLabel from '../Components/TabBar/TabBarLabel';
import TabBarIcon from '../Components/TabBar/TabBarIcon';
import { ICON_SIZE } from '../Components/Common/Icon';
import { toBaseDesignPx, colors, spacers } from '../Core/Theme';

// Screens root
import Playground from '../Screens/Playground';
import HomeScreen from '../Screens/Home';
import CalendarScreen from '../Screens/Calendar';
import ClassRoomScreen from '../Screens/ClassRooms';
import ProfileScreen from '../Screens/Profile';

// Screens
import ClassHubScreen from '../Screens/ClassHub';

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
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
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
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="calendar" />,
};

CalendarStack.path = '';

// TODO: Open a modal when is add is pressed
const AddStack = createStackNavigator(
  {
    Add: Playground,
  },
  config
);

AddStack.navigationOptions = {
  transitionConfig: {
    isModal: true,
  },
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      containerStyle={{
        ...spacers.MB_2,
        backgroundColor: colors.GREEN,
        borderRadius: toBaseDesignPx(30),
        width: toBaseDesignPx(60),
        height: toBaseDesignPx(60),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: toBaseDesignPx(3) },
        shadowOpacity: toBaseDesignPx(0.2),
        shadowRadius: toBaseDesignPx(4),
        elevation: toBaseDesignPx(2),
      }}
      name="add"
      size={ICON_SIZE.EXTRA_SMALL}
      color={focused ? colors.GRAY_LIGHT : colors.WHITE}
    />
  ),
};

AddStack.path = '';

const ClassRoomStack = createStackNavigator(
  {
    Clases: ClassRoomScreen,
    ClassHub: {
      screen: ClassHubScreen,
    },
  },
  config
);

ClassRoomStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} name="Clases" />,
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="whiteboard" />,
  };
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
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="user" />,
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
