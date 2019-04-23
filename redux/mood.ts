import { createReducer } from 'redux-starter-kit';
import { createAction } from 'redux-starter-kit';

import moodService from '../services/mood';

export const getMoods = createAction('GET_MOODS');
export const editMood = createAction('EDIT_MOOD');
export const newMood = createAction('NEW_MOOD');

export const updateMood = ({ id, moodName, icon, rating }) => dispatch => {
  moodService.editMood({ id, moodName, icon, rating });
};

export const newMoodThunk = mood => dispatch => {
  moodService.createMood(mood);
};

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
  }
});

export default moodsReducer;
