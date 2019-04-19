import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './screens/Home';
import Details from './screens/Details';
import EditEntry from './screens/EditEntry';

const AppNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Details: { screen: Details },
    EditEntry: { screen: EditEntry }
  },
  { initialRouteName: 'Home' }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
