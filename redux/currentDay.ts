import { createReducer, createAction } from 'redux-starter-kit';

export const setEntryDay = createAction('SET_ENTRY_DAY');

const initialState = '';

const currentDayReducer = createReducer(initialState, {
  // todo figure out how to get around this TS/redux-starter-kit issue
  // @ts-ignore
  [setEntryDay]: (state, { payload: { dayId } }) => {
    return dayId;
  },
});

export default currentDayReducer;
