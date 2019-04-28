import { createReducer } from 'redux-starter-kit';
import { createAction } from 'redux-starter-kit';

import habitProgressService from '../services/habitProgress';
import HabitProgressInterface from '../types/habitProgress';

export const getHabitProgresses = createAction('GET_HABIT_PROGRESS_PROGRESSES');
export const editHabitProgress = createAction('EDIT_HABIT_PROGRESS');
export const newHabitProgress = createAction('NEW_HABIT_PROGRESS');
export const deleteHabitProgress = createAction('DELETE_HABIT_PROGRESS');

export const updateHabitProgress = (
  habitProgress: HabitProgressInterface
) => dispatch => habitProgressService.editHabitProgress(habitProgress);

export const newHabitProgressThunk = (
  habitProgress: HabitProgressInterface
) => dispatch => habitProgressService.createHabitProgress(habitProgress);

export const deleteHabitProgressThunk = (
  habitProgress: HabitProgressInterface
) => dispatch => habitProgressService.deleteHabitProgress(habitProgress);

export const populateHabitProgressesThunk = ({ habitProgresses }) => (
  dispatch,
  getState
) => {
  const state = getState();
  const habits = state.habits;
  const progressToObjects = habitProgresses.map(progress => ({ ...progress }));

  dispatch(getHabitProgresses({ habits, habitProgress: progressToObjects }));
};

const initialState = {};

const habitProgressReducer = createReducer(initialState, {
  [getHabitProgresses]: (state, action) => {
    const newState = Object.assign({}, state);

    action.payload.habitProgress.forEach(habitProgress => {
      let day = newState[habitProgress.day];
      const habit = action.payload.habits[habitProgress.habit];
      const enhancedHabitProgress = {
        ...habitProgress,
        habitName: habit.name,
        habitIcon: habit.icon,
      };

      if (!day) {
        newState[habitProgress.day] = [enhancedHabitProgress];
      } else {
        newState[habitProgress.day] = day.concat(enhancedHabitProgress);
      }
    });

    return newState;
  },
  [editHabitProgress]: (state, action) => {
    return {
      ...state,
      [action.payload.habitProgress.id]: action.payload.habitProgress,
    };
  },
  [newHabitProgress]: (state, { payload: { habitProgress } }) => {
    return { ...state, [habitProgress.id]: habitProgress };
  },
  [deleteHabitProgress]: (state, action) => {
    const id = action.payload.id;
    const newState = Object.assign({}, state);

    delete newState[id];

    return { ...newState };
  },
});

export default habitProgressReducer;
