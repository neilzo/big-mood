import { createReducer } from 'redux-starter-kit';
import { createAction } from 'redux-starter-kit';

import moodService from '../services/mood';

export const getMoods = createAction('GET_MOODS');
export const editMood = createAction('EDIT_MOOD');

export const updateMood = ({
  id,
  moodName,
  icon,
  rating
}) => async dispatch => {
  const mood = await moodService.editMood({ id, moodName, icon, rating });
  dispatch(editMood({ mood }));
  return mood;
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
  }
});

export default moodsReducer;
