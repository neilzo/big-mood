import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import thunk from 'redux-thunk';

import moodsReducer from './mood';

const reducer = {
  moods: moodsReducer
};

const preloadedState = {
  moods: {}
};

const store = configureStore({
  reducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState
});

export default store;
