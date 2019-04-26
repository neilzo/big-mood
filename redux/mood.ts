import { createReducer, createAction } from 'redux-starter-kit';

import moodService from '../services/mood';
import MoodInterface from '../types/mood';

export const getMoods = createAction('GET_MOODS');
export const editMood = createAction('EDIT_MOOD');
export const newMood = createAction('NEW_MOOD');
export const deleteMood = createAction('DELETE_MOOD');

export const updateMood = (mood: MoodInterface) => () =>
  moodService.editMood(mood);

export const newMoodThunk = (mood: MoodInterface) => () =>
  moodService.createMood(mood);

export const deleteMoodThunk = (mood: MoodInterface) => () =>
  moodService.deleteMood(mood);

const initialState = {};

const moodsReducer = createReducer(initialState, {
  // @ts-ignore
  [getMoods]: (state, action) => {
    const newState = {};

    action.payload.moods.forEach((mood: MoodInterface) => {
      // @ts-ignore
      newState[mood.id] = mood;
    });

    return { ...state, ...newState };
  },
  // @ts-ignore
  [editMood]: (state, action) => {
    return { ...state, [action.payload.mood.id]: action.payload.mood };
  },
  // @ts-ignore
  [newMood]: (state, { payload: { mood } }) => {
    return { ...state, [mood.id]: mood };
  },
  // @ts-ignore
  [deleteMood]: (state, action) => {
    const id = action.payload.id;
    const newState = Object.assign({}, state);

    // @ts-ignore
    delete newState[id];

    return { ...newState };
  }
});

export default moodsReducer;
