import { createReducer } from 'redux-starter-kit';
import { createAction } from 'redux-starter-kit';

export const getMoods = createAction('GET_MOODS');
export const editMood = createAction('EDIT_MOOD');

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
