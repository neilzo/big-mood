import { createReducer } from 'redux-starter-kit';
import { createAction } from 'redux-starter-kit';

import moodService from '../services/mood';
import MoodInterface from '../types/mood';

export const getMoods = createAction('GET_MOODS');
export const editMood = createAction('EDIT_MOOD');
export const newMood = createAction('NEW_MOOD');
export const deleteMood = createAction('DELETE_MOOD');

export const updateMood = (mood: MoodInterface) => dispatch =>
  moodService.editMood(mood);

export const newMoodThunk = (mood: MoodInterface) => dispatch =>
  moodService.createMood(mood);

export const deleteMoodThunk = (mood: MoodInterface) => dispatch =>
  moodService.deleteMood(mood);

const initialState = {};

const moodsReducer = createReducer(initialState, {
  [getMoods]: (state, action) => {
    const newState = {};

    action.payload.moods.forEach(mood => {
      newState[mood.id] = mood;
    });

    return { ...state, ...newState };
  },
  [editMood]: (state, action) => {
    return { ...state, [action.payload.mood.id]: action.payload.mood };
  },
  [newMood]: (state, { payload: { mood } }) => {
    return { ...state, [mood.id]: mood };
  },
  [deleteMood]: (state, action) => {
    const id = action.payload.id;
    const newState = Object.assign({}, state);

    delete newState[id];

    return { ...newState };
  }
});

export default moodsReducer;
