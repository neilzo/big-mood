import { createReducer } from 'redux-starter-kit';
import { createAction } from 'redux-starter-kit';

import habitService from '../services/habit';
import HabitInterface from '../types/habit';

export const getHabits = createAction('GET_HABITS');
export const editHabit = createAction('EDIT_HABIT');
export const newHabit = createAction('NEW_HABIT');
export const deleteHabit = createAction('DELETE_HABIT');

export const updateHabit = (habit: HabitInterface) => dispatch =>
  habitService.editHabit(habit);

export const newHabitThunk = (habit: HabitInterface) => dispatch =>
  habitService.createHabit(habit);

export const deleteHabitThunk = (habit: HabitInterface) => dispatch =>
  habitService.deleteHabit(habit);

const initialState = {};

const habitsReducer = createReducer(initialState, {
  [getHabits]: (state, action) => {
    const newState = {};

    action.payload.habits.forEach(habit => {
      newState[habit.id] = habit;
    });

    return { ...state, ...newState };
  },
  [editHabit]: (state, action) => {
    return { ...state, [action.payload.habit.id]: action.payload.habit };
  },
  [newHabit]: (state, { payload: { habit } }) => {
    return { ...state, [habit.id]: habit };
  },
  [deleteHabit]: (state, action) => {
    const id = action.payload.id;
    const newState = Object.assign({}, state);

    delete newState[id];

    return { ...newState };
  },
});

export default habitsReducer;
