import { createReducer, createAction } from 'redux-starter-kit';
import uniqBy from 'lodash/uniqBy';
import findIndex from 'lodash/findIndex';

import habitProgressService from '../services/habitProgress';
import HabitProgressInterface from '../types/habitProgress';

export const getHabitProgresses = createAction('GET_HABIT_PROGRESS_PROGRESSES');
export const editHabitProgress = createAction('EDIT_HABIT_PROGRESS');
export const newHabitProgress = createAction('NEW_HABIT_PROGRESS');
export const deleteHabitProgress = createAction('DELETE_HABIT_PROGRESS');

export const updateHabitProgress = (
  habitProgress: HabitProgressInterface
) => () => habitProgressService.editHabitProgress(habitProgress);

export const newHabitProgressThunk = (
  habitProgress: HabitProgressInterface
) => () => habitProgressService.createHabitProgress(habitProgress);

export const deleteHabitProgressThunk = (
  habitProgress: HabitProgressInterface
) => () => habitProgressService.deleteHabitProgress(habitProgress);

export const populateHabitProgressesThunk = ({
  habitProgresses,
}: {
  habitProgresses: [];
  // @ts-ignore
}) => (dispatch, getState) => {
  const state = getState();
  const habits = state.habits;
  const progressToObjects = habitProgresses.map(
    (progress: HabitProgressInterface) => ({ ...progress })
  );

  dispatch(getHabitProgresses({ habits, habitProgress: progressToObjects }));
};

interface State {
  [id: string]: Array<HabitProgressInterface>;
}

const initialState = {};

const habitProgressReducer = createReducer(initialState, {
  // @ts-ignore
  [getHabitProgresses]: (state, action) => {
    const newState: State = Object.assign({}, state);

    action.payload.habitProgress.forEach(
      (habitProgress: HabitProgressInterface) => {
        const day = newState[habitProgress.day];
        const habit = action.payload.habits[habitProgress.habit];
        const enhancedHabitProgress = {
          ...habitProgress,
          habitName: habit.name,
          habitIcon: habit.icon,
        };

        if (!day) {
          newState[habitProgress.day] = [enhancedHabitProgress];
        } else {
          newState[habitProgress.day] = uniqBy(
            day.concat([enhancedHabitProgress]),
            (progress: HabitProgressInterface) => {
              return progress.id;
            }
          );
        }
      }
    );

    return newState;
  },
  // @ts-ignore
  [editHabitProgress]: (state: State, action) => {
    const habitProgress = action.payload.habitProgress;

    state[habitProgress.day] = habitProgress;
  },
  // @ts-ignore
  [newHabitProgress]: (state: State, action) => {
    const habitProgress = action.payload.habitProgress;

    state[habitProgress.day] = habitProgress;
  },
  // @ts-ignore
  [deleteHabitProgress]: (state: State, action) => {
    const dayId = action.payload.dayId;
    const habitProgressId = action.payload.habitProgressId;
    const day = state[dayId];
    const index = findIndex(
      day,
      habitProgress => habitProgress.id === habitProgressId
    );

    day.splice(index, 1);
  },
});

export default habitProgressReducer;
