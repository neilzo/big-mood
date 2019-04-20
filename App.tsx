import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './screens/Home';
import Details from './screens/Details';
import EditEntry from './screens/EditEntry';
import Settings from './screens/Settings';
import BottomNav from './components/BottomNav/BottomNav';

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Details: { screen: Details },
    EditEntry: {
      screen: EditEntry
    },
    Settings: { screen: Settings }
  },
  {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    tabBarComponent: props => <BottomNav {...props} />
  }
);

const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
