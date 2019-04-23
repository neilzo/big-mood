import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';

import store from './redux/store';
import MainNavigator from './Navigator';

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
