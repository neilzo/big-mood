import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import thunk from 'redux-thunk';

import moodsReducer from './mood';
import daysReducer from './day';
import habitsReducer from './habit';

const reducer = {
  moods: moodsReducer,
  days: daysReducer,
  habits: habitsReducer
};

const preloadedState = {
  moods: {},
  days: {}
};

const store = configureStore({
  reducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState
});

export default store;
