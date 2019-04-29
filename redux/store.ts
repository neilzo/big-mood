import { configureStore } from 'redux-starter-kit';
import thunk from 'redux-thunk';

import moodsReducer from './mood';
import daysReducer from './day';
import habitsReducer from './habit';
import habitProgressReducer from './habitProgress';
import currentDayReducer from './currentDay';

const reducer = {
  moods: moodsReducer,
  days: daysReducer,
  habits: habitsReducer,
  habitProgress: habitProgressReducer,
  currentDay: currentDayReducer,
};

const preloadedState = {
  moods: {},
  days: {},
  habits: {},
  habitProgress: {},
  currentDay: '',
};

const store = configureStore({
  reducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});

export default store;
