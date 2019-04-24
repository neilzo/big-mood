import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import store from './redux/store';

import HomeScreen from './screens/Home';
import Details from './screens/Details';
import EditEntry from './screens/EditEntry';
import Settings from './screens/Settings';
import MoodSettings from './screens/MoodSettings';
import MoodForm from './screens/modals/MoodForm';
import HabitSettings from './screens/HabitSettings';
import BottomNav from './components/BottomNav/BottomNav';

const getCurrentRoute = navigationState => {
  if (!navigationState) {
    return null;
  } else if (!navigationState.routes) {
    return navigationState;
  }

  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentRoute(route);
  }

  return route;
};

export const Routes = {
  Home: { key: 'Home', title: 'Home' },
  Details: { key: 'Details' },
  EditEntry: {
    key: 'EditEntry'
  },
  Settings: { key: 'Settings', title: 'Settings' },
  MoodSettings: { key: 'MoodSettings', title: 'Edit Moods' },
  HabitSettings: { key: 'HabitSettings', title: 'Edit Habits' }
};

const TabNavigator = createBottomTabNavigator(
  {
    [Routes.Home.key]: { screen: HomeScreen },
    [Routes.Details.key]: { screen: Details },
    [Routes.EditEntry.key]: {
      screen: EditEntry
    },
    [Routes.Settings.key]: { screen: Settings },
    [Routes.MoodSettings.key]: { screen: MoodSettings },
    [Routes.HabitSettings.key]: { screen: HabitSettings }
  },
  {
    initialRouteName: 'HabitSettings',
    tabBarComponent: props => <BottomNav {...props} />
  }
);

const MainNavigator = createStackNavigator(
  {
    main: {
      screen: TabNavigator,
      navigationOptions: ({ navigation }) => {
        const navRoute = getCurrentRoute(navigation.state),
          route = navRoute && navRoute.routeName && Routes[navRoute.routeName],
          title = route ? route.title : '';

        return { title };
      }
    },
    MoodForm: {
      screen: MoodForm
    }
  },
  {
    mode: 'modal',
    initialRouteName: 'main'
  }
);

export default MainNavigator;
