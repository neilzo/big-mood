import { createReducer } from 'redux-starter-kit';
import { createAction } from 'redux-starter-kit';
import get from 'lodash/get';
import dayService from '../services/day';

export const getDays = createAction('GET_DAYS');
export const editDay = createAction('EDIT_DAY');
export const newDay = createAction('NEW_DAY');

export const getDaysThunk = () => dispatch => {
  const days = dayService.getDays();
  const daysToObjects = days.map(day => ({ ...day }));
  dispatch(getDays({ days: daysToObjects }));
};

const initialState = {};

const daysReducer = createReducer(initialState, {
  [getDays]: (state, action) => {
    const newState = {};
    const days = get(action, 'payload.days', []);

    days.forEach(day => {
      newState[day.id] = day;
    });

    return { ...state, ...newState };
  },
  [editDay]: (state, { payload: { day } }) => {
    return { ...state, [day.id]: day };
  },
  [newDay]: (state, { payload: { day } }) => {
    return { ...state, [day.id]: day };
  },
});

export default daysReducer;
