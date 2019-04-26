import React from 'react';
import App from '../App';
import { createComponent } from '../helpers/renderer';

jest.mock('react-redux', () => {
  return {
    Provider: 'Provider'
  };
});

jest.mock('react-navigation', () => {
  return {
    createAppContainer: jest.fn(() => 'AppContainer')
  };
});

jest.mock('../redux/store', () => {
  return {};
});

jest.mock('../Navigator', () => 'Navigator');

describe('App', () => {
  it('renders correctly', () => {
    expect(createComponent(<App />).toJSON()).toMatchSnapshot();
  });
});
