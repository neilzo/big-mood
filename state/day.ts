import { createReducer } from 'redux-starter-kit';
import { createAction } from 'redux-starter-kit';
import get from 'lodash/get';

export const getDays = createAction('GET_DAYS');
export const editDay = createAction('EDIT_DAY');
export const createDay = createAction('CREATE_DAY');

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
  [createDay]: (state, { payload: { day } }) => {
    return { ...state, [day.id]: day };
  }
});

export default daysReducer;
