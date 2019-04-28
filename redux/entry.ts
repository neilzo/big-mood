import { createReducer } from 'redux-starter-kit';
import { createAction } from 'redux-starter-kit';
import get from 'lodash/get';
import entryService from '../services/entry';

export const getEntrys = createAction('GET_DAYS');
export const editEntry = createAction('EDIT_DAY');
export const newEntry = createAction('NEW_DAY');

export const newEntryThunk = ({ entry, habitProgress }) => () => {
  entryService.createEntry({ entry, habitProgress });
};

const initialState = {};

const entrysReducer = createReducer(initialState, {
  [getEntrys]: (state, action) => {
    const newState = {};
    const entrys = get(action, 'payload.entrys', []);

    entrys.forEach(entry => {
      newState[entry.id] = entry;
    });

    return { ...state, ...newState };
  },
  [editEntry]: (state, { payload: { entry } }) => {
    return { ...state, [entry.id]: entry };
  },
  [newEntry]: (state, { payload: { entry } }) => {
    return { ...state, [entry.id]: entry };
  }
});

export default entrysReducer;
